import TrackBubble from '../components/TrackBubble'
import * as d3 from 'd3-scale-chromatic'
import {scheme} from '../palette'
import {Divider, Tag, Tooltip} from 'antd'
import {ms2Str} from '../utils'
import CountTinyLine from '../components/CountTinyLine'
import TripleExplorer from '../components/TripleExplorer'
import TopBar from '../components/TopBar'
import CountAnalysis from '../components/CountAnalysis'

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
    <div style={{height: '92vh', display: 'flex', justifyContent: 'space-evenly'}}>
      <div style={{flexBasis: '48%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
        <div style={{flexBasis: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          {allTopList}
        </div>
        <div style={{flexBasis: '60%', background: 'white', boxShadow: '0 2px 8px rgb(0 0 0 / 9%)', padding: '16px'}}>
          <TripleExplorer
            style={{flexBasis: '45%'}}
            data={{
              track2Count, track2Duration, artist2Count, artist2Duration, album2Count, album2Duration,
              track2PlayCount, track2Listeners, artist2PlayCount, artist2Listeners, album2PlayCount,
              album2Listeners,
              track2CountByYearMonth, artist2CountByYearMonth, artist2DistinctTracks,
              album2CountByYearMonth, album2DistinctTracks,
              startDate, endDate
            }}/>
          <TopBar style={{flexBasis: '45%', display: 'flex', flexDirection: 'column'}}
                  track2CountByYearMonth={track2CountByYearMonth}
                  artist2CountByYearMonth={artist2CountByYearMonth}
                  album2CountByYearMonth={album2CountByYearMonth}
                  startDate={startDate}
                  endDate={endDate}
          />
        </div>
      </div>
      <div style={{flexBasis: '48%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
        <div style={{flexBasis: '25%'}}>
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
        <div style={{
          flexBasis: '35%', display: 'flex', flexDirection: 'column', background: 'white',
          boxShadow: '0 2px 8px rgb(0 0 0 / 9%)', padding: '16px'
        }}>
          <p>
            <span style={{fontWeight: 'bold'}}>Popularity chart: </span>
            The x axis is the total listens of track, artist and album, and the y axis is the times you listened to it.
            Besides, the size of bubble represents the accumulated duration you listened to it.
          </p>
          <div style={{display: 'flex', height: '100%'}}>
            <TrackBubble style={{flexBasis: '100%'}} data={trackData} color={d3.schemeSet3[0]}/>
            <TrackBubble style={{flexBasis: '100%'}} data={artistData} color={d3.schemeSet3[2]}/>
            <TrackBubble style={{flexBasis: '100%'}} data={albumData} color={d3.schemeSet3[3]}/>
          </div>
        </div>
        <div style={{
          flexBasis: '35%', display: 'flex', flexDirection: 'column', background: 'white',
          boxShadow: '0 2px 8px rgb(0 0 0 / 9%)', padding: '16px'
        }}>
          <p>
            <span style={{fontWeight: 'bold'}}>Listens chart: </span>
            The color denotes the count you listened to the track, artist and album,
            and the angle represents the number of track / artist / album you listened to at the corresponding count.
          </p>
          <div style={{display: 'flex', height: '100%'}}>
            <CountAnalysis style={{flexBasis: '100%'}} type={'Track'} count={track2Count} color={d3.schemeSet3[0]}/>
            <CountAnalysis style={{flexBasis: '100%'}} type={'Artist'} count={artist2Count} color={d3.schemeSet3[2]}/>
            <CountAnalysis style={{flexBasis: '100%'}} type={'Album'} count={album2Count} color={d3.schemeSet3[3]}/>
          </div>
        </div>
      </div>
    </div>
  )
}