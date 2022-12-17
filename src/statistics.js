import StreamingHistory0 from './assets/StreamingHistory0.json'
import history from './assets/history.json'
import {getInfo} from './api'

async function fetchInfo() {
  const infoList = []
  for (let record of StreamingHistory0) {
    // noinspection JSUnresolvedVariable
    const info = {
      endTime: record.endTime,
      msPlayed: record.msPlayed,
      ...await getInfo(record.trackName, record.artistName)
    }
    infoList.push(info)
  }
  return infoList
}

export default function statistics() {
  const track2Count = {}, track2Duration = {}, tag2Count = {}, tag2Duration = {}
  for (let record of history) {
    const trackName = record.track.name
    track2Count[trackName] = track2Count[trackName] + 1 || 1
    track2Duration[trackName] = track2Duration[trackName] + record.msPlayed || record.msPlayed
    // noinspection JSUnresolvedVariable
    for (let tag of record.track?.toptags?.tag) {
      // Replace non-alphabet character.
      const name = tag.name.replace(/[^a-zA-Z0-9]+/, ' ').toUpperCase().trim()
      tag2Count[name] = tag2Count[name] + 1 || 1
      tag2Duration[name] = tag2Duration[name] + record.msPlayed || record.msPlayed
    }
  }

  return {
    track2Count, track2Duration, tag2Count, tag2Duration
  }
}