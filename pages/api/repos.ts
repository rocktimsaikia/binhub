import type { NextApiRequest, NextApiResponse } from 'next'
import { RepoResponse } from 'types'
import { getToken } from 'next-auth/jwt'
import apiAuth from 'lib/apiAuth'

const getAllRepoos = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret: process.env.JWT_SERCET })

  const data = await fetch('https://api.github.com/user/repos', {
    headers: {
      Authorization: `token ${token!.accessToken}`
    }
  })

  const repos = await data.json()

  const filteredRepos = repos.map(
    ({
      owner,
      name,
      html_url,
      description,
      created_at,
      private: isPrivate,
      fork
    }: RepoResponse) => ({
      owner: owner.login,
      name,
      html_url,
      description,
      created_at,
      isPrivate,
      fork
    })
  )

  // sort by date oldest to newest
  // .sort(
  //   (r1: RepoResponse, r2: RepoResponse) =>
  //     new Date(r2.created_at).valueOf() - new Date(r1.created_at).valueOf()
  // )

  res.status(200).json(filteredRepos)
}

export default apiAuth(getAllRepoos)
