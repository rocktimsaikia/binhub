import { createContext } from 'react'
import { ReducerAction } from 'types'

export const RepoContext = createContext<{
  dispatch: React.Dispatch<ReducerAction>
}>({
  dispatch: () => null
})
