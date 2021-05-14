import { Button, Link, Spacer, Text, Note } from '@geist-ui/react'

export default function Unauthorized() {
  return (
    <div
      style={{
        textAlign: 'center'
      }}>
      <Text h1>403</Text>
      <Note type="warning" style={{ width: '500px', margin: 'auto' }}>
        You must login before viewing this page
      </Note>
      <Spacer y={5} />
      <Link href="/">
        <Button type="secondary">Go home</Button>
      </Link>
    </div>
  )
}
