import type { NextApiRequest, NextApiResponse } from 'next'
import auth from 'lib/auth'
import { getAccessToken } from 'lib/accessToken'
import { getSession } from 'next-auth/client'

const deleteRepo = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const accessToken = await getAccessToken(session!.user.id)

  const { owner, repo } = req.query

  const data = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    method: 'DELETE',
    headers: {
      Authorization: `token ${accessToken}`
    }
  })

  if (data.status !== 204) {
    return res.status(400).send('Something went wrong!')
  }

  res.status(204).send('Repo removed successfully')
}

export default auth(deleteRepo)
