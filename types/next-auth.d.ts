import { Session, User, Profile } from 'next-auth'

export declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      image: string
      username: string
      name: string
    }
  }

  interface User {
    id: string
    username: string
  }

  interface Profile {
    login: string
  }
}
