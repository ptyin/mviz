import React from 'react';
import { Timeline } from 'antd';
export default function ({style}) {

  return (
    <Timeline style={style} pending mode={'alternate'}>
      <Timeline.Item>HIP HOP</Timeline.Item>
      <Timeline.Item>HIP HOP</Timeline.Item>
      <Timeline.Item>HIP HOP</Timeline.Item>
    </Timeline>
  )
}