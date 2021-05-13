import NextAuth, { Profile, User } from 'next-auth'
import Providers from 'next-auth/providers'
import { getUserFromId, updateUser } from 'lib/user'

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'delete_repo repo'
    })
  ],

  secret: process.env.AUTH_SECRET,
  database: process.env.DATABASE_URL,

  session: {
    jwt: true
  },

  jwt: {
    secret: process.env.JWT_SERCET
  },

  callbacks: {
    jwt: async (token, user: User, _acount, profile: Profile) => {
      if (!user?.id) return token

      let dbUser = await getUserFromId(user.id)

      if (!dbUser.username && profile.login) {
        dbUser = await updateUser(user.id, profile.login)
      }

      const response = { ...token, id: user.id, username: dbUser.username }

      return response
    },

    session: async (session, user: User) => {
      const sessionUser = {
        ...session.user,
        id: user.id,
        username: user.username
      }

      return { ...session, user: sessionUser }
    }
  }
})
