import { getSession } from 'next-auth/client'
import Profile from 'components/Profile'
import Layout from 'components/Layout'
import { GetServerSideProps, NextPage } from 'next'
import { Session } from 'next-auth'

interface Props {
  session: Session
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req
}) => {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}

const Home: NextPage<Props> = ({ session }) => {
  return (
    <Layout>
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

export default Home
