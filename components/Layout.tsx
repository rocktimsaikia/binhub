import { PropsWithChildren } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Page, Link, Text, Image } from '@geist-ui/react'

interface Meta {
  title: string
  description: string
  image: string
  date?: string
}

export default function Layout<T>(props: PropsWithChildren<T>) {
  const router = useRouter()
  const { children, ...customMeta } = props
  const meta: Meta = {
    title: 'Binhub – Bulk removing github repositories made easy.',
    description: `Bulk remove github repositories with ease`,
    image: 'https://binhub.vercel.app/image/banner.png',
    ...customMeta
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://binhub.vercel.app/${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://binhub.vercel.app/${router.asPath}`}
        />
        <meta property="og:site_name" content="Rocktim Saikia" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rocktimcodes" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
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
    </>
  )
}
