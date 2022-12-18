import {Table} from 'antd'

export default function ({tag2Count, tag2Duration, style}) {
  const data = []
  for (let tag in tag2Count) {
    data.push({
      key: tag, tag, count: tag2Count[tag], duration: tag2Duration[tag]
    })
  }
  console.log(tag2Count, tag2Duration)
  const columns = [
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: 'Count',
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
      render: ms => new Date(ms).toISOString().slice(11, 19)
    },
  ];

  // TODO Add line plot
  return (
    <Table size={'middle'}
           style={style}
           showSorterTooltip={false}
           pagination={{pageSize: 7, showSizeChanger: false}}
           columns={columns} dataSource={data}
    >

    </Table>
  )
}