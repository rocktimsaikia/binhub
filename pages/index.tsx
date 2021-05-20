import { Text, Button, Spacer, Grid, Display } from '@geist-ui/react'
import { Github } from '@geist-ui/react-icons'
import { signIn } from 'next-auth/client'
import Image from 'next/image'
import Layout from 'components/Layout'
import { getSession } from 'next-auth/client'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // Get the user's session based on the request
  const session = await getSession({ req })

  if (!session) {
    return {
      props: { session }
    }
  }

  return {
    redirect: {
      destination: '/profile',
      permanent: false
    }
  }
}

export default function Home() {
  return (
    <Layout>
      <Spacer y={4} />
      <div style={{ textAlign: 'center' }}>
        <h1 className="header-title">
          <span className="light-underline">Bulk removing</span> github
          <br /> repositories <span className="light-underline">made easy</span>
          .
        </h1>
        <Spacer y={2} />
        <Button
          auto
          type="secondary"
          icon={<Github />}
          onClick={() =>
            signIn('github', {
              callbackUrl: `${window.location.origin}/profile`
            })
          }>
          Login with Github
        </Button>
      </div>
    </Layout>
  )
}
