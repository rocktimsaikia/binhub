import { ObjectId } from 'mongodb'
import { getDatabase } from './database'

export const getUserFromId = async (userId: string) => {
  const db = await getDatabase()
  const user = await db
    .collection('users')
    .findOne({ _id: new ObjectId(userId) })

  if (!user) throw new Error('No user found')

  return user
}

export const updateUser = async (userId: string, username: string) => {
  const db = await getDatabase()

  const updatedUser = await db
    .collection('users')
    .findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: { username } },
      { returnOriginal: false }
    )

  return updatedUser.value
}
