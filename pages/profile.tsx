import { useSession } from 'next-auth/client'
import Profile from 'components/Profile'
import Layout from 'components/Layout'
import ErrorPage from 'components/Unauthorized'

export default function Home() {
  const [session] = useSession()

  return (
    <Layout>
      {!session && <ErrorPage />}
      {session && (
        <Profile
          name={session.user.name}
          username={session.user.username}
          image={session.user.image}
        />
      )}
    </Layout>
  )
}
