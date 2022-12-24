const axios = require('axios')
const fs = require('fs')
const dotEnv = require('dotenv')
const cliProgress = require('cli-progress')
dotEnv.config()
dotEnv.config({ path: '.env.local', override: true })

axios.defaults.baseURL = 'http://ws.audioscrobbler.com/2.0'
axios.defaults.params = {
  api_key: process.env.REACT_APP_API_KEY,
  format: 'json'
}

const readFile = './src/assets/StreamingHistory0.json', dumpedFile = './src/assets/history0.json'

async function get (params) {
  let res
  try {
    res = await axios.get('/', {params})
  } catch (e) {
    console.error(e)
  }
  return res.data
}

async function fetchInfo (json) {
  const infoList = []
  const trackMap = new Map(), artistMap = new Map(), albumMap = new Map()
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
  bar.start(json.length, 0)
  let step = 0
  try {
    for (let {track, artistName, trackName, endTime, msPlayed} of json) {
      const info = {endTime: endTime || 0, msPlayed: msPlayed || 0,}
      infoList.push(info)
      // const trackInfo = (({name, duration, listeners, playcount, toptags, artist, album}) =>
      //   ({name, duration, listeners, playcount, toptags, artist, album}))
      // (track)
      const trackStr = `${artistName}\t${trackName}`
      const trackInfo = trackMap.get(trackStr) ||
        (({name, duration, listeners, playcount, toptags, artist, album}) =>
          ({name, duration, listeners, playcount, toptags, artist, album}))
        ((await get({
          method: 'track.getInfo',
          track: trackName,
          artist: artistName,
        })).track)
      trackMap.set(trackStr, trackInfo)
      info.track = trackInfo
      if (trackInfo.artist) {
        const artistInfo = artistMap.get(trackInfo.artist.name) ||
          ((({name, image, stats: {listeners, playcount}}) =>
            ({name, image: image && image[0], listeners, playcount})))
          ((await get({
            method: 'artist.getInfo',
            artist: trackInfo.artist.name,
          })).artist)
        artistMap.set(trackInfo.artist.name, artistInfo)
        trackInfo.artist = artistInfo
      }

      if (trackInfo.album) {
        const albumStr = `${trackInfo.album.artist}\t${trackInfo.album.title}`
        const albumInfo = albumMap.get(albumStr) ||
          ((({name, image, listeners, playcount}) =>
            ({name, image: image && image[0], listeners, playcount})))((await get({
            method: 'album.getInfo',
            artist: trackInfo.album.artist,
            album: trackInfo.album.title,
          })).album)
        albumMap.set(albumStr, albumInfo)
        trackInfo.album = albumInfo
      }
      bar.update(++step)
    }
  } catch (e) {
    console.error(`Error occurred in step ${step}, fetched info temporarily saved in ${dumpedFile}`)
    return infoList
  } finally {
    bar.stop()
  }
  return infoList
}

fs.readFile(readFile, 'utf8', (err,raw) => {
  const json = JSON.parse(raw)
  console.log(`Start fetch ${json.length} records!`)
  fetchInfo(json).then(info => {
    fs.writeFile(dumpedFile, JSON.stringify(info), 'utf8', () => {
      console.log(`Successfully dumped to ${dumpedFile}!`)
    })
  }).catch(err => {
    console.error(err)
  })
})
