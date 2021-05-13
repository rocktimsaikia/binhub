import { MongoClient, Db } from 'mongodb'
import { URL } from 'url'

let cachedDb: Db | undefined

export async function getDatabase(uri = process.env.DATABASE_URL): Promise<Db> {
  if (cachedDb) return cachedDb

  if (!uri) throw new Error('Unable to connect to database, no URI  provided')

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const dbName = new URL(uri).pathname?.substr(1)

  if (!dbName) {
    throw new Error('Unable to derive a dbName to connect to')
  }

  const db = client.db(dbName)

  // Cache the database connection and return the connection
  cachedDb = db
  return db
}
