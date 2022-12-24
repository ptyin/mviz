import { Radio, Space } from 'antd';
import {useEffect, useState} from 'react'
import GenericExplorer from './GenericExplorer'

export default function ({
                           data: {
                             track2Count, track2Duration, artist2Count, artist2Duration, album2Count, album2Duration,
                             track2PlayCount, track2Listeners, artist2PlayCount, artist2Listeners, album2PlayCount,
                             album2Listeners,
                             track2CountByYearMonth, artist2CountByYearMonth, artist2DistinctTracks,
                             album2CountByYearMonth, album2DistinctTracks,
                             startDate, endDate
                           },
                           style
                         }) {
  const [choice, setChoice] = useState('track')
  const [tableData, setTableData] = useState([])
  const [maxTracks, setMaxTracks] = useState(0)

  const getTableData = (count, duration, countByYearMonth, distinctTracks, ) => {
    const tableData = []
    let maxTracks = 0
    for (let name in count) {
      const timeline = []
      for (let year = startDate.year, month = startDate.month;
           year < endDate.year || month <= endDate.month;
           month++) {
        timeline.push(countByYearMonth[name][`${year}-${month}`])
        // Reset month to the beginning of the next year
        if (month === 12) {
          month = 0
          year++
        }
      }
      const datum = {key: name, name, count: count[name], duration: duration[name], timeline}
      if (distinctTracks) {
        maxTracks = Math.max(maxTracks, distinctTracks[name].size)
        datum.tracks = distinctTracks[name].size
      }
      tableData.push(datum)
    }
    return [tableData, maxTracks]
  }

  useEffect(() => {
    let result
    switch (choice) {
      case 'track':
        result = getTableData(track2Count, track2Duration, track2CountByYearMonth)
        setTableData(result[0])
        setMaxTracks(0)
        break
      case 'artist':
        result = getTableData(artist2Count, artist2Duration, artist2CountByYearMonth, artist2DistinctTracks)
        setTableData(result[0])
        setMaxTracks(result[1])
        break
      case 'album':
        result = getTableData(album2Count, album2Duration, album2CountByYearMonth, album2DistinctTracks)
        setTableData(result[0])
        setMaxTracks(result[1])
        break
    }
  }, [choice])
  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <Radio.Group value={choice} buttonStyle="outline" onChange={e => setChoice(e.target.value)}>
        <div style={{height: '100%', display: 'flex', justifyContent: 'center'}}>
          <Radio.Button style={{width: '33.3%'}} value={'track'}>Track</Radio.Button>
          <Radio.Button style={{width: '33.3%'}} value={'artist'}>Artist</Radio.Button>
          <Radio.Button style={{width: '33.3%'}} value={'album'}>Album</Radio.Button>
        </div>
      </Radio.Group>
      <GenericExplorer style={{width: '100%'}} data={tableData} maxTracks={maxTracks}/>
    </div>
  )
}