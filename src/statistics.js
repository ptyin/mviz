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
  const track2Count = {}, track2Duration = {}, tag2Count = {}, tag2Duration = {}, tag2CountByYearMonth = {}
  const tag2CountByTrack = {}
  let minDate = new Date(history[0]?.endTime), maxDate = new Date(history[0]?.endTime)
  for (let record of history) {
    const trackName = record.track.name
    const artistName = record.track.artist.name
    const trackArtistStr = `${trackName} - ${artistName}`
    const date = new Date(record.endTime)
    minDate = date < minDate ? date : minDate
    maxDate = date > maxDate ? date : maxDate
    const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}`
    track2Count[trackName] = track2Count[trackName] + 1 || 1
    track2Duration[trackName] = track2Duration[trackName] + record.msPlayed || record.msPlayed
    // noinspection JSUnresolvedVariable
    for (let tag of record.track?.toptags?.tag) {
      // Replace non-alphabet character.
      const name = tag.name.replace(/[^a-zA-Z0-9]+/, ' ').toUpperCase().trim()
      tag2Count[name] = tag2Count[name] + 1 || 1
      tag2Duration[name] = tag2Duration[name] + record.msPlayed || record.msPlayed
      if (!tag2CountByYearMonth[name])
        tag2CountByYearMonth[name] = {}
      if (!tag2CountByYearMonth[name][dateStr])
        tag2CountByYearMonth[name][dateStr] = 0
      tag2CountByYearMonth[name][dateStr]++
      if (!tag2CountByTrack[name])
        tag2CountByTrack[name] = {}
      if (!tag2CountByTrack[name][trackArtistStr])
        tag2CountByTrack[name][trackArtistStr] = 0
      tag2CountByTrack[name][trackArtistStr]++
    }
  }

  return {
    track2Count, track2Duration, tag2Count, tag2Duration, tag2CountByYearMonth, tag2CountByTrack,
    startDate: {year: minDate.getFullYear(), month: minDate.getMonth() + 1, day: minDate.getDate()},
    endDate: {year: maxDate.getFullYear(), month: maxDate.getMonth() + 1, day: minDate.getDate()},
  }
}