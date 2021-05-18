import React, { useEffect } from 'react'
import Repo from 'components/Repo'
import { Trash2, LogOut, AlertTriangleFill } from '@geist-ui/react-icons'
import { signOut } from 'next-auth/client'
import { useImmerReducer } from 'use-immer'
import { reducer } from 'state/Reducer'
import { SingleRepo } from 'types'
import { RepoContext } from 'state/RepoContext'
import { NormalTypes } from '@geist-ui/react/dist/utils/prop-types'
import {
  Spacer,
  Loading,
  Button,
  Text,
  User,
  Modal,
  Link,
  Divider,
  Select,
  useModal,
  useToasts,
  Grid
} from '@geist-ui/react'

export interface State {
  initialRepos: SingleRepo[]
  repos: SingleRepo[]
  success: string
  isDeleting: boolean
  isLoading: boolean
}

const initialState: State = {
  initialRepos: [],
  repos: [],
  success: '',
  isDeleting: false,
  isLoading: false
}

interface Props {
  name: string
  username: string
  image: string
}

export default function Profile({ name, username, image }: Props) {
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const { visible, setVisible: setModalVisible, bindings } = useModal()
  const [, setToast] = useToasts()

  const openToast = (text: string, type: NormalTypes) =>
    setToast({ text, type })

  const fetchRepos = async () => {
    dispatch({ type: 'loading', isloading: true })
    const data = await fetch('/api/repos')
    const json = await data.json()
    dispatch({ type: 'setRepos', repos: json })
    dispatch({ type: 'loading', isloading: false })
  }

  const deleteRepos = async () => {
    dispatch({ type: 'deleting' })

    const selected = state!.repos.filter((repo) => repo.selected)

    selected.forEach(async ({ owner, name }) => {
      try {
        await fetch(`/api/delete/?owner=${owner}&repo=${name}`)
      } catch (error) {
        openToast(`Cound not delete "${owner}/${name}"`, 'error')
      }
    })

    dispatch({ type: 'success' })
    openToast('Selected repos has been deleted.', 'success')
    setModalVisible(false)
  }

  useEffect(() => {
    fetchRepos()
  }, [])

  const selectedReps = state.repos.filter((repo) => repo.selected)

  const filterRepos = (val: string | string[]) => {
    console.log(state.initialRepos)

    if (val === 'all') {
      dispatch({ type: 'updateRepos', repos: state.initialRepos })
      return
    }

    if (val === 'fork') {
      const forkedRepos = state.initialRepos.filter((repo) => repo.fork)
      dispatch({ type: 'updateRepos', repos: forkedRepos })
      return
    }

    if (val === 'private') {
      const privateRepos = state.initialRepos.filter((repo) => repo.isPrivate)
      dispatch({ type: 'updateRepos', repos: privateRepos })
      return
    }
  }

  return (
    <>
      <Modal {...bindings}>
        <Modal.Title>
          <Text h3>Delete repos</Text>
        </Modal.Title>
        <Text size={14}>
          You are going to delete the following repos.
          <br /> Are you sure ?
        </Text>

        <Modal.Content>
          <ol>
            {selectedReps.map((repo) => (
              <li key={repo.name + repo.owner}>
                <Link color href={repo.html_url}>
                  {repo.name}
                </Link>
              </li>
            ))}
          </ol>
        </Modal.Content>
        <Modal.Action passive onClick={() => setModalVisible(false)}>
          <Text b>No, Go back.</Text>
        </Modal.Action>
        <Modal.Action
          loading={state.isDeleting}
          onClick={deleteRepos}
          style={{ color: '#FF3F56' }}>
          <AlertTriangleFill color="#FF3F56" size="18" /> <Spacer x={0.5} />{' '}
          <Text b>Yes, Delete!</Text>
        </Modal.Action>
      </Modal>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <User src={image} name={name}>
          <User.Link href={`https://github.com/${username}`}>
            @{username}
          </User.Link>
        </User>
        <div>
          <Button
            auto
            icon={<LogOut />}
            onClick={() =>
              signOut({ callbackUrl: `${window.location.origin}/` })
            }
            style={{ marginRight: '20px' }}>
            Sign out
          </Button>
          <Button
            type="error"
            auto
            icon={<Trash2 />}
            onClick={() => setModalVisible(true)}>
            Delete {selectedReps.length || null}
          </Button>
        </div>
      </div>
      <Spacer y={4} />

      <Divider>
        <Select placeholder="Filter" onChange={filterRepos}>
          <Select.Option value="all">All</Select.Option>
          <Select.Option value="fork">Fork</Select.Option>
          <Select.Option value="private">Private</Select.Option>
        </Select>
      </Divider>
      <Spacer y={2} />

      {state.isLoading && <Loading>Fetching data from github</Loading>}
      {!state.isLoading && !state.repos.length && (
        <Text type="secondary">No repos</Text>
      )}

      {state.repos && (
        <RepoContext.Provider value={{ dispatch }}>
          <Grid.Container gap={2}>
            {state.repos.map((repo) => (
              <Grid xs={12}>
                <Repo key={repo.name} {...repo} />
              </Grid>
            ))}
          </Grid.Container>
        </RepoContext.Provider>
      )}
    </>
  )
}
