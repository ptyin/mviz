import {useEffect, useState} from 'react'
import {message, Progress} from 'antd'
import {scheme} from '../palette'
import fetchInfo from '../fetch'


export default function ({history, onLoaded}) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    try {
      // noinspection JSCheckFunctionSignatures
      fetchInfo(history, (step, total) => setProgress((step / total * 100).toFixed(2)))
        .then(info => {
          message.success(`Successfully loaded ${info.length} listening records!`).then(onLoaded(info))
        })
    } catch (e) {
      message.error(e.messages).then(onLoaded(false))
    }
  }, [])
  return (
    <Progress style={{width: '80%'}} percent={progress} strokeColor={{ '0%': scheme.primary, '100%': scheme.bgDark }} />
  )
}