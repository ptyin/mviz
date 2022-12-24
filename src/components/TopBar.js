import {Radio, Slider} from 'antd'
import {useEffect, useState} from 'react'
import {Bar} from '@ant-design/plots'
import {scheme} from '../palette'
// import * as d3 from 'd3-scale-chromatic'

export default function ({track2CountByYearMonth, artist2CountByYearMonth, album2CountByYearMonth,
                           startDate, endDate, style}) {
  const [choice, setChoice] = useState('track')
  const [current, setCurrent] = useState(0)
  const [data, setData] = useState([])

  const allData = {track: [], artist: [], album: []}
  const id2DateStr = []
  for (let year = startDate.year, month = startDate.month; year < endDate.year || month <= endDate.month; month++) {
    id2DateStr.push(`${year}-${month}`)
    for (let ins of ['track', 'artist', 'album']) {
      const countByYearMonth = ins === 'track' ? track2CountByYearMonth :
        choice === 'artist' ? artist2CountByYearMonth : album2CountByYearMonth
      for (let name in countByYearMonth) {
        if (!allData[ins][id2DateStr[id2DateStr.length - 1]])
          allData[ins][id2DateStr[id2DateStr.length - 1]] = {}
        if (!allData[ins][id2DateStr[id2DateStr.length - 1]][name])
          allData[ins][id2DateStr[id2DateStr.length - 1]][name] = 0
        if (id2DateStr.length > 1)
          allData[ins][id2DateStr[id2DateStr.length - 1]][name] =
            // allData[ins][id2DateStr[id2DateStr.length - 2]][name] +
            (countByYearMonth[name][id2DateStr[id2DateStr.length - 1]] || 0)
        else
          allData[ins][id2DateStr[id2DateStr.length - 1]][name] =
            countByYearMonth[name][id2DateStr[id2DateStr.length - 1]] || 0
      }
    }

    // Reset month to the beginning of the next year
    if (month === 12) {
      month = 0
      year++
    }
  }
  useEffect(() => {
    setData(
      Object.keys(allData[choice][id2DateStr[current]])
        .filter(name => allData[choice][id2DateStr[current]][name])
        .map(name => ({name, count: allData[choice][id2DateStr[current]][name]}))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)
    )
  }, [choice, current])

  const BarInstance = ({data}) => {
    const config = {
      data,
      height: 150,
      xField: 'count',
      yField: 'name',
      seriesField: 'name',
      color: scheme.primary,
      xAxis: {
        title: {
          text: 'Listens',
          position: 'end',
          offset: 1
        }
      },
      yAxis: {
        label: {
          formatter: name => name.length > 10 ? name.slice(0, 8) + '...' : name
        }
      },
      legend: {
        position: 'top-left',
      },
    }
    return <Bar {...config} />
  }
  return (
    <div style={style}>
      <Radio.Group value={choice} buttonStyle="outline" onChange={e => setChoice(e.target.value)}>
        <div style={{height: '100%', display: 'flex', justifyContent: 'center'}}>
          <Radio.Button style={{width: '33.3%'}} value={'track'}>Track</Radio.Button>
          <Radio.Button style={{width: '33.3%'}} value={'artist'}>Artist</Radio.Button>
          <Radio.Button style={{width: '33.3%'}} value={'album'}>Album</Radio.Button>
        </div>
      </Radio.Group>
      <div style={{height: '150px'}}>
        <BarInstance data={data} />
      </div>
      <Slider min={0} max={id2DateStr.length - 1}
              marks={{0: id2DateStr[0]}}
              onChange={value => setCurrent(value)}
              tooltip={{formatter: value => id2DateStr[value]}} />
    </div>
  )
}