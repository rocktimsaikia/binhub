import { Button, Page, Link, Text } from '@geist-ui/react'
import { Github, Coffee } from '@geist-ui/react-icons'
import { signIn, useSession } from 'next-auth/client'
import Profile from 'components/Profile'
import HomePage from 'components/Home'

export default function Home() {
  const [session] = useSession()

  return (
    <Page dotBackdrop>
      {!session && <HomePage />}
      {session && (
        <Profile
          name={session.user.name}
          username={session.user.username}
          image={session.user.image}
        />
      )}

      <Page.Footer
        style={{
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}>
        <Text>
          Created by{' '}
          <Link color href="https://github.com/rocktimsaikia">
            @rocktimsaikia
          </Link>{' '}
          &copy; 2021 |
        </Text>

        <Link
          href="https://github.com/rocktimsaikia/binhub"
          style={{ marginRight: '10px' }}>
          <Github size={20} />
        </Link>
        <Link href="https://buymeacoffee.com/rocktimcodes">
          <Coffee />
        </Link>
      </Page.Footer>
    </Page>
  )
}
