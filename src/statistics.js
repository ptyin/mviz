import history from './assets/history.json'

export default function statistics() {
  const track2Count = {}, track2Duration = {}, artist2Count = {}, artist2Duration = {}, album2Count = {},
    album2Duration = {}
  const track2PlayCount = {}, track2Listeners = {}, album2PlayCount = {}, album2Listeners = {}, artist2PlayCount = {},
    artist2Listeners = {}
  const tag2Count = {}, tag2Duration = {}, tag2CountByYearMonth = {}, tag2CountByTrack = {}
  const durationByYearMonth = {}
  const track2CountByYearMonth = {}, artist2CountByYearMonth = {}, artist2DistinctTracks = {},
    album2CountByYearMonth = {}, album2DistinctTracks = {}
  const artist2Image = {}, album2Image = {}
  let totalDuration = 0
  let minDate = new Date(history[0]?.endTime), maxDate = new Date(history[0]?.endTime)
  for (let record of history) {
    const trackName = record.track.name, artistName = record.track.artist.name, albumName = record.track.album?.name
    const trackArtistStr = `${trackName} - ${artistName}`
    const date = new Date(record.endTime)
    minDate = date < minDate ? date : minDate
    maxDate = date > maxDate ? date : maxDate
    const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}`
    track2Count[trackName] = track2Count[trackName] + 1 || 1
    track2Duration[trackName] = track2Duration[trackName] + record.msPlayed || record.msPlayed
    artist2Count[artistName] = artist2Count[artistName] + 1 || 1
    artist2Duration[artistName] = artist2Duration[artistName] + record.msPlayed || record.msPlayed
    if (albumName) {
      album2Count[albumName] = album2Count[albumName] + 1 || 1
      album2Duration[albumName] = album2Duration[albumName] + record.msPlayed || record.msPlayed
    }

    track2PlayCount[trackName] = record.track.playcount * 1
    track2Listeners[trackName] = record.track.listeners * 1
    artist2PlayCount[artistName] = record.track.artist.playcount * 1
    artist2Listeners[artistName] = record.track.artist.listeners * 1
    if (albumName) {
      album2PlayCount[albumName] = record.track.album?.playcount * 1
      album2Listeners[albumName] = record.track.album?.listeners * 1
    }

    artist2Image[artistName] = record.track.artist.image['#text']
    if (albumName)
      album2Image[albumName] = record.track.album.image['#text']

    totalDuration += record.msPlayed

    durationByYearMonth[dateStr] = durationByYearMonth[dateStr] + record.msPlayed || record.msPlayed

    if (!track2CountByYearMonth[trackName])
      track2CountByYearMonth[trackName] = {}
    if (!track2CountByYearMonth[trackName][dateStr])
      track2CountByYearMonth[trackName][dateStr] = 0
    track2CountByYearMonth[trackName][dateStr]++

    if (!artist2CountByYearMonth[artistName])
      artist2CountByYearMonth[artistName] = {}
    if (!artist2CountByYearMonth[artistName][dateStr])
      artist2CountByYearMonth[artistName][dateStr] = 0
    artist2CountByYearMonth[artistName][dateStr]++
    if (!artist2DistinctTracks[artistName])
      artist2DistinctTracks[artistName] = new Set()
    artist2DistinctTracks[artistName].add(trackName)

    if (albumName) {
      if (!album2CountByYearMonth[albumName])
        album2CountByYearMonth[albumName] = {}
      if (!album2CountByYearMonth[albumName][dateStr])
        album2CountByYearMonth[albumName][dateStr] = 0
      album2CountByYearMonth[albumName][dateStr]++
      if (!album2DistinctTracks[albumName])
        album2DistinctTracks[albumName] = new Set()
      album2DistinctTracks[albumName].add(trackName)
    }

    const tagNameSet = new Set()
    // noinspection JSUnresolvedVariable
    for (let tag of record.track.toptags?.tag) {
      // Replace non-alphabet character.
      const name = tag.name.replace(/[^a-zA-Z0-9]+/, ' ').toUpperCase().trim()
      tagNameSet.add(name)
    }
    for (let name of tagNameSet) {
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
    track2Count, track2Duration, artist2Count, artist2Duration, album2Count, album2Duration,
    track2PlayCount, track2Listeners, artist2PlayCount, artist2Listeners, album2PlayCount, album2Listeners,
    tag2Count, tag2Duration, tag2CountByYearMonth, tag2CountByTrack,
    artist2Image, album2Image,
    durationByYearMonth,
    track2CountByYearMonth, artist2CountByYearMonth, artist2DistinctTracks, album2CountByYearMonth, album2DistinctTracks,
    totalDuration,
    startDate: {year: minDate.getFullYear(), month: minDate.getMonth() + 1, day: minDate.getDate()},
    endDate: {year: maxDate.getFullYear(), month: maxDate.getMonth() + 1, day: minDate.getDate()},
  }
}