import { useState } from 'react';
import TagPie from '../components/TagPie'

export var clickedTag = 'HIP HOP'
export function setClickedTag(tagName) {
  clickedTag = tagName
}

export default function ({data, style}) {

  const [state, setState] = useState('HIP HOP')
  setClickedTag((tagName) => { console.log("tagview: tag is clicked"); setState(tagName) })
  
  console.log("tagpie", data);

  return <TagPie style={style} data={data[state]} tagName={state} />
}
