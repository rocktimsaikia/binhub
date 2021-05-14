import { Card, Link, Text, Tag, Tooltip } from '@geist-ui/react'
import { Folder } from '@geist-ui/react-icons'
import { useContext } from 'react'
import { SingleRepo } from 'types'
import { RepoContext } from 'context/RepoContext'
import { format } from 'date-fns'

export default function RepoCard({
  name,
  html_url,
  description,
  selected,
  isPrivate,
  fork,
  created_at
}: SingleRepo) {
  const { dispatch } = useContext(RepoContext)

  return (
    <Card
      type={selected ? 'warning' : 'default'}
      shadow
      style={{ marginBottom: '40px' }}>
      <Card.Content
        style={{ cursor: 'pointer' }}
        onClick={() => dispatch({ type: 'toggleSelect', payload: name })}>
        <Folder size={20} />
        <Text h4>{name}</Text>
        <Text small>{description ? description : 'no description'}</Text>
      </Card.Content>

      <Card.Footer
        style={{
          backgroundColor: '#f2f2f2',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
        <Link color target="_blank" href={html_url} icon>
          <Text>Visit repository</Text>
        </Link>
        <div>
          {isPrivate && <Tag type="secondary">Private</Tag>}

          {fork && <Tag type="secondary">Fork</Tag>}

          <Tag type="secondary">
            <Tooltip text="Created at">
              {format(new Date(created_at), 'PP')}
            </Tooltip>
          </Tag>
        </div>
      </Card.Footer>
    </Card>
  )
}
