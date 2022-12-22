import {Table} from 'antd'
import {TinyLine} from '@ant-design/plots'
import {scheme} from '../palette'
import {ms2Str} from '../utils'

export default function ({tag2Count, tag2Duration, tag2CountByYearMonth, startDate, endDate, style}) {
  const data = []
  for (let tag in tag2Count) {
    data.push({
      key: tag, tag, count: tag2Count[tag], duration: tag2Duration[tag]
    })
  }
  const TagTinyLine = ({tag}) => {
    const data = []
    for (let year = startDate.year, month = startDate.month; year < endDate.year || month <= endDate.month; month++) {
      data.push(tag2CountByYearMonth[tag][`${year}-${month}`])
      // Reset month to the beginning of the next year
      if (month === 12) {
        month = 0
        year++
      }
    }
    const config = {
      data,
      width: 300,
      height: 20,
      autoFit: false,
      color: scheme.primary,
      smooth: true,
    };
    return <TinyLine {...config} />;
  };
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
      render: ms => ms2Str(ms)
    },
    {
      title: 'Listens by month',
      dataIndex: 'tag',
      key: 'timeline',
      render: tag => <TagTinyLine tag={tag} />
    }
  ];

  return (
    <Table size={'small'}
           style={style}
           showSorterTooltip={false}
           pagination={{pageSize: 5, showSizeChanger: false}}
           columns={columns} dataSource={data}
    >

    </Table>
  )
}