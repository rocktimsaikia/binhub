import { PropsWithChildren } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Page, Link, Text, Image } from '@geist-ui/react'

interface Meta {
  title: string
  description: string
  image: string
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
          content={`https://binhub.vercel.app${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://binhub.vercel.app${router.asPath}`}
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

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link
              href="https://github.com/rocktimsaikia/binhub"
              style={{ marginRight: '25px' }}
              target="_blank"
              rel="noopener">
              <svg
                aria-hidden="true"
                focusable="false"
                height="20"
                data-prefix="fab"
                data-icon="github"
                className="svg-inline--fa fa-github fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512">
                <path
                  fill="currentColor"
                  d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
              </svg>
            </Link>
            <Link
              href="https://buymeacoffee.com/rocktimcodes"
              target="_blank"
              rel="noopener">
              <Image src="/buymeacoffee.png" width={120} />
            </Link>
          </div>
        </Page.Header>
        <Page.Content>{props.children}</Page.Content>
        <Page.Footer style={{ textAlign: 'center', padding: '10px 0' }}>
          <Text size={12} b>
            Created by{' '}
            <Link
              color
              href="https://github.com/rocktimsaikia"
              target="_blank"
              rel="noopener">
              @rocktimsaikia
            </Link>{' '}
            &copy; 2021 - Present
          </Text>
        </Page.Footer>
      </Page>
    </>
  )
}
