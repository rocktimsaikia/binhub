import { ReducerAction } from 'types'
import { State } from 'components/Profile'

export const reducer = (draft: State, action: ReducerAction): void => {
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
