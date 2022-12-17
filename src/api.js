import axios from 'axios'

axios.defaults.baseURL = 'http://ws.audioscrobbler.com/2.0'
axios.defaults.params = {
  api_key: process.env.REACT_APP_API_KEY,
  format: 'json'
}

export async function getInfo(track, artist) {
  let res
  try {
    res = await axios.get('/', {
      params: {
        method: 'track.getInfo',
        track,
        artist
      }
    })
  } catch (e) {
    console.error(e)
  }
  return res.data
}