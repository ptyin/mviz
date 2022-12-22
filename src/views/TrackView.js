import TrackBubble from '../components/TrackBubble'
import * as d3 from 'd3-scale-chromatic'
import {scheme} from '../palette'
import {Divider, Tag, Tooltip} from 'antd'
import {ms2Str} from '../utils'
import CountTinyLine from '../components/CountTinyLine'
import TripleExplorer from '../components/TripleExplorer'

export default function ({
                           data: {
                             track2Count, track2Duration, artist2Count, artist2Duration, album2Count, album2Duration,
                             track2PlayCount, track2Listeners, artist2PlayCount, artist2Listeners, album2PlayCount,
                             album2Listeners,
                             durationByYearMonth,
                             totalDuration,
                             track2CountByYearMonth, artist2CountByYearMonth, artist2DistinctTracks,
                             album2CountByYearMonth, album2DistinctTracks,
                             album2Image,
                             startDate, endDate
                           }}) {
  let trackData = [], artistData = [], albumData = []
  for (let track in track2Count) {
    trackData.push({
      type: 'track', name: track, count: track2Count[track], duration: track2Duration[track],
      durationStr: ms2Str(track2Duration[track]),
      playCount: track2PlayCount[track], listeners: track2Listeners[track]
    })
  }
  for (let artist in artist2Count) {
    artistData.push({
      type: 'artist', name: artist, count: artist2Count[artist], duration: artist2Duration[artist],
      durationStr: ms2Str(artist2Duration[artist]),
      playCount: artist2PlayCount[artist], listeners: artist2Listeners[artist]
    })
  }
  for (let album in album2Count) {
    albumData.push({
      type: 'album', name: album, count: album2Count[album], duration: album2Duration[album],
      durationStr: ms2Str(album2Duration[album]),
      playCount: album2PlayCount[album], listeners: album2Listeners[album]
    })
  }

  const topList = (data) => data.sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map(({name}, i) => (
      <Tooltip key={name} title={name}>
        {data[0].type === 'track' || data[0].type === 'artist' ?
          <Tag color={d3.schemeSet3[i]}
               style={{color: scheme.textFillDark, width: '80px', textAlign: 'center'}}>
            {name.length > 8 ? name.slice(0, 5) + '...' : name}
          </Tag>
          :
          <img style={{marginRight: '16px', }} src={album2Image[name]} alt={name}/>}
      </Tooltip>
    ))
  const allTopList = [trackData, artistData, albumData].map((data, i) => (
    <div key={i}>
      <p style={{color: scheme.textFillDark, margin: '0', fontWeight: 'bold',}}>Top {data[0].type}</p>
      <Divider style={{margin: '4px', borderTop: `1px solid ${scheme.primary}`}}/>
      <div style={{display: 'flex'}}>
        {topList(data)}
      </div>
    </div>
  ))
  return (
    <div style={{height: '92vh', display: 'flex', flexDirection: 'column'}}>
      <div style={{flexBasis: '20%', display: 'flex', justifyContent: 'space-between', width: '100%', margin: 'auto'}}>
        <div style={{flexBasis: '40%', display: 'flex', flexDirection: 'column'}}>
          {allTopList}
        </div>
        <div style={{flexBasis: '55%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
          <div style={{display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
            {
              [
                [`${startDate.year}/${startDate.month}/${startDate.day}`, 'Start'],
                [`${endDate.year}/${endDate.month}/${endDate.day}`, 'End'],
                [ms2Str(totalDuration), 'Total Duration'],
              ].map(([value, title], i) => (
                <div key={i} style={{flexBasis: '30%', textAlign: 'center'}}>
                  <p style={{fontSize: '24px', fontWeight: 'bold', color: scheme.textFillDark}}>{value}</p>
                  <p style={{fontSize: '16px', color: scheme.textFillGrey}}>{title}</p>
                </div>
              ))
            }
          </div>
          <CountTinyLine durationByYearMonth={durationByYearMonth} startDate={startDate} endDate={endDate} />
        </div>
      </div>
      <div style={{flexBasis: '30%', display: 'flex', justifyContent: 'space-between', width: '100%', margin: 'auto'}}>
        <div style={{flexBasis: '40%', display: 'flex'}}>
          <TrackBubble style={{flexBasis: '100%'}} data={trackData} color={d3.schemeSet3[0]}/>
          <TrackBubble style={{flexBasis: '100%'}} data={artistData} color={d3.schemeSet3[2]}/>
          <TrackBubble style={{flexBasis: '100%'}} data={albumData} color={d3.schemeSet3[3]}/>
        </div>
        <div style={{flexBasis: '60%'}}>
        </div>
      </div>
      <div style={{flexBasis: '30%', display: 'flex', justifyContent: 'space-between', width: '100%', margin: 'auto'}}>
        <div style={{flexBasis: '40%'}}>
          <TripleExplorer
            data={{
              track2Count, track2Duration, artist2Count, artist2Duration, album2Count, album2Duration,
              track2PlayCount, track2Listeners, artist2PlayCount, artist2Listeners, album2PlayCount,
              album2Listeners,
              track2CountByYearMonth, artist2CountByYearMonth, artist2DistinctTracks,
              album2CountByYearMonth, album2DistinctTracks,
              startDate, endDate
            }}/>
        </div>
        <div style={{flexBasis: '40%'}}>

        </div>
      </div>

    </div>
  )
}