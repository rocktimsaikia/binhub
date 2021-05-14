import { Page, Text, Button, Spacer } from '@geist-ui/react'
import { Github } from '@geist-ui/react-icons'
import { signIn } from 'next-auth/client'
import Image from 'next/image'
import Layout from 'components/Layout'

export default function Home() {
  return (
    <Layout>
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <Image src="/image/binhub.png" height="100" width="300" />
        <Text h4>Bulk removing github repositories made easy.</Text>
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
          <Text>Log in with Github</Text>
        </Button>
      </div>
    </Layout>
  )
}
