import { Page, Text, Button, Spacer, Link } from '@geist-ui/react'
import { Github, Coffee } from '@geist-ui/react-icons'
import { signIn } from 'next-auth/client'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Page.Content style={{ textAlign: 'center' }}>
        <Image src="/image/binhub.png" height="100" width="300" />
        <Text h4>Bulk removing github repositories made easy.</Text>
        <Spacer y={2} />
        <Button
          auto
          type="secondary-light"
          icon={<Github />}
          onClick={() => signIn('github')}>
          <Text>Log in with Github</Text>
        </Button>
      </Page.Content>
    </>
  )
}
