import React, { useEffect } from 'react'
import Repo from 'components/Repo'
import { Trash2, LogOut } from '@geist-ui/react-icons'
import { signOut } from 'next-auth/client'
import { useImmerReducer } from 'use-immer'
import { SingleRepo, ReducerAction } from 'types'
import { RepoContext } from 'context/RepoContext'
import pMap from 'p-map-lite'
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
  Page,
  Select,
  useModal,
  useToasts,
  Grid
} from '@geist-ui/react'

interface State {
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

const repoReducer = (draft: State, action: ReducerAction): void => {
  switch (action.type) {
    case 'setRepos':
      draft.repos = action.repos!.map((repo) => ({ ...repo, selected: false }))
      // Setting a initial constant repos state for filtering
      draft.initialRepos = action.repos!.map((repo) => ({
        ...repo,
        selected: false
      }))
      return

    case 'loading':
      draft.isLoading = action.isloading!
      return

    case 'updateRepos':
      draft.repos = action.repos!
      return

    case 'toggleSelect':
      const repo = draft.repos.find((repo) => repo.name === action.payload)
      // update initialstate repos too
      const storedRepo = draft.initialRepos.find(
        (repo) => repo.name === action.payload
      )

      storedRepo!.selected = !storedRepo!.selected
      repo!.selected = !repo!.selected
      return

    case 'success':
      draft.isDeleting = false
      draft.repos = draft.repos.filter((repo) => !repo.selected)
      // Also updating the inital repos state after a successfull deletetion
      draft.initialRepos = draft.initialRepos.filter((repo) => !repo.selected)
      return

    case 'deleting':
      draft.isDeleting = true
      return

    default:
      break
  }
}

export default function Profile({ name, username, image }: Props) {
  const [state, dispatch] = useImmerReducer(repoReducer, initialState)

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

  const deleteRepo = async (owner: string, repo: string) => {
    await fetch(`/api/delete/?owner=${owner}&repo=${repo}`)
  }

  const deleteRepos = async () => {
    dispatch({ type: 'deleting' })

    const selectedRepos = state!.repos.filter((repo) => repo.selected)
    await pMap(selectedRepos, async ({ owner, name }) => {
      await deleteRepo(owner, name)
    })

    dispatch({ type: 'success' })
    openToast('Successfully deleted the selected repos.', 'success')
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
        <Modal.Title>Are you sure?</Modal.Title>

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
          Cancel
        </Modal.Action>
        <Modal.Action loading={state.isDeleting} onClick={deleteRepos}>
          Delete
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
