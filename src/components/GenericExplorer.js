import {Table, Tooltip} from 'antd'
import {Progress, TinyLine} from '@ant-design/plots'
import {scheme} from '../palette'
import {ms2Str} from '../utils'

export default function ({data, maxTracks, style}) {
  const ArtistTinyLine = ({data}) => {
    const config = {
      data,
      width: 100,
      height: 10,
      autoFit: false,
      color: scheme.primary,
      smooth: true,
    };
    return <TinyLine {...config} />
  }

  const ArtistProgress = ({distinctTracks, maxTracks}) => {
    const config = {
      width: 100,
      height: 10,
      autoFit: false,
      percent: distinctTracks / maxTracks,
      color: scheme.primary,
    }
    return (
      <div style={{display: 'flex'}}>
        <Progress {...config} />
        <p style={{margin: '0 8px'}}>{distinctTracks}</p>
      </div>
    )
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: name => (
        <Tooltip title={name}>
          {name.length > 8 ? name.slice(0, 5) + '...' : name}
        </Tooltip>
      )
    },
    {
      title: 'Listens',
      dataIndex: 'count',
      key: 'count',
      sorter: (a, b) => a.count - b.count,
      defaultSortOrder: 'descend'
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      sorter: (a, b) => a.duration - b.duration,
      render: ms => ms2Str(ms)
    },
    {
      title: 'Listens by month',
      dataIndex: 'timeline',
      key: 'timeline',
      render: timeline => <ArtistTinyLine data={timeline} />
    }
  ]
  if (maxTracks) {
    columns.splice(1, 0, {
      title: 'Distinct tracks',
      dataIndex: 'tracks',
      key: 'tracks',
      render: tracks => <ArtistProgress distinctTracks={tracks} maxTracks={maxTracks} />
    })
  }

  return (
    <Table size={'small'}
           style={style}
           showSorterTooltip={false}
           pagination={{pageSize: 3, showSizeChanger: false}}
           columns={columns} dataSource={data}
    >

    </Table>
  )
}