import { useState } from 'react';
import TagPie from '../components/TagPie'

export var onClickedTag = undefined
export function setClickedTagCallback(callbackFunc) {
  onClickedTag = callbackFunc
}

export default function ({data, style}) {

  const [state, setState] = useState('HIP HOP')
  setClickedTagCallback((tagName) => { console.log("tagview: tag is clicked"); setState(tagName) })
  
  console.log("tagpie", data);

  return <TagPie style={style} data={data[state]} tagName={state} />
}
