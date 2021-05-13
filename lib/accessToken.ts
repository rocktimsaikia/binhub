import { ObjectId } from 'mongodb'
import { getDatabase } from './database'

export const getAccessToken = async (userId: string): Promise<string> => {
  const db = await getDatabase()

  const user = await db
    .collection('accounts')
    .findOne({ userId: new ObjectId(userId) })

  if (!user) {
    throw new Error('No user found')
  }

  const { accessToken } = user
  return accessToken
}
