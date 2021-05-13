interface Response {
  name: string
  html_url: string
  description: string
  selected: boolean
  created_at: string
  fork: boolean
}
export interface RepoResponse extends Response {
  owner: Record<string, string | boolean | number>
  private: boolean
}

interface SingleRepo extends Response {
  owner: string
  isPrivate: boolean
}

export interface ReducerAction {
  type:
    | 'setRepos'
    | 'toggleSelect'
    | 'error'
    | 'success'
    | 'deleting'
    | 'openModal'
    | 'closeModal'
    | 'updateRepos'
    | 'setInitialRepos'
    | 'loading'
  repos?: Repo[]
  payload?: string
  selectOption?: string | string[]
  isloading?: boolean
}
