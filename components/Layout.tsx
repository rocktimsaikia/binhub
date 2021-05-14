import { PropsWithChildren } from 'react'
import { Page, Link, Text } from '@geist-ui/react'
import * as Icon from '@geist-ui/react-icons'

export default function Layout<T>(props: PropsWithChildren<T>) {
  return (
    <Page dotBackdrop>
      {props.children}
      <Page.Footer
        style={{
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
          <Icon.Github size={20} />
        </Link>
        <Link href="https://buymeacoffee.com/rocktimcodes">
          <Icon.Coffee />
        </Link>
      </Page.Footer>
    </Page>
  )
}
