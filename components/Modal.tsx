import { Modal } from '@geist-ui/react'
import { SingleRepo } from 'types'

interface Props {
  bindings: {
    open: boolean
    onClose: () => void
  }
  selected: SingleRepo[]
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  deleteRepos: () => Promise<void>
}

export default function Modal({
  bindings,
  selected,
  setModalVisible,
  deleteRepos
}: Props) {
  return (
    <Modal {...bindings}>
      <Modal.Title>Are you sure?</Modal.Title>

      <Modal.Content>
        <ol>
          {selected.map((repo) => (
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
  )
}
