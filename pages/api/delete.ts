import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import apiAuth from 'lib/apiAuth'

const deleteRepo = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret: process.env.JWT_SERCET })

  const { owner, repo } = req.query

  const data = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    method: 'DELETE',
    headers: {
      Authorization: `token ${token!.accessToken}`
    }
  })

  if (data.status !== 204) {
    return res.status(400).send('Something went wrong!')
  }

  res.status(204).send('Repo removed successfully')
}

export default apiAuth(deleteRepo)
