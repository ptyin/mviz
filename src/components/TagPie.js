import { Pie } from '@ant-design/plots';
import * as d3 from 'd3-scale-chromatic'

export default function ({style}) {
  const data = [
    {
      type: 'Back to back',
      value: 30,
    },
    {
      type: 'WAP',
      value: 25,
    },
    {
      type: 'Rap god',
      value: 15,
    },
    {
      type: 'Till I collapse',
      value: 15,
    },
  ]
  const config = {
    data,
    appendPadding: 10,
    angleField: 'value',
    colorField: 'type',
    color: d3.schemeSet3,
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
        fill: 'black',
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'Hip Hop',
      },
    },
  }
  return <Pie style={style} {...config} />
}
