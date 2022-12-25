import { useState } from 'react';
import TagPie from '../components/TagPie'

export var onClickedTag = undefined
export function setClickedTagCallback(callbackFunc) {
  onClickedTag = callbackFunc
}

export default function ({data, initialTag, style}) {

  const [state, setState] = useState(initialTag)
  setClickedTagCallback((tagName) => { setState(tagName) })

  return <TagPie style={style} data={data[state]} tagName={state} />
}
