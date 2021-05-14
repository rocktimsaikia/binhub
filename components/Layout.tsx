import { PropsWithChildren } from 'react'
import { Page, Link, Text, Image } from '@geist-ui/react'
import * as Icon from '@geist-ui/react-icons'

export default function Layout<T>(props: PropsWithChildren<T>) {
  return (
    <Page style={{ padding: 0 }}>
      <Page.Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 0'
        }}>
        <Link href="/">
          <Image src="/image/binhub.png" width={120} />
        </Link>

        <div>
          <Link
            href="https://github.com/rocktimsaikia/binhub"
            style={{ marginRight: '25px' }}>
            <Text type="secondary">Github</Text>
          </Link>

          <Link href="https://buymeacoffee.com/rocktimcodes">
            <Text type="secondary">Support</Text>
          </Link>
        </div>
      </Page.Header>
      <Page.Content>{props.children}</Page.Content>
      <Page.Footer style={{ textAlign: 'center' }}>
        <Text>
          Created by{' '}
          <Link color href="https://github.com/rocktimsaikia">
            @rocktimsaikia
          </Link>{' '}
          &copy; 2021 - Present
        </Text>
      </Page.Footer>
    </Page>
  )
}
