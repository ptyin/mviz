import {Pie} from '@ant-design/plots';
import * as d3 from 'd3-scale-chromatic'

export default function ({count, color, type, style}) {
  const listens2Number = {}
  let maxCount = 0
  for (let name in count) {
    maxCount = Math.max(maxCount, count[name])
    listens2Number[count[name]] = listens2Number[count[name]] + 1 || 1
  }
  const data = Object.keys(listens2Number).map(count => ({listens: count, number: listens2Number[count]}))

  const config = {
    data,
    angleField: 'number',
    colorField: 'listens',
    color: d3.schemeSet3,
    radius: 1,
    innerRadius: 0.6,
    label: false,
    statistic: {
      title: {
        content: type,
      },
    },
    // xAxis: {
    //   title: {
    //     text: 'Listens',
    //     position: 'end',
    //     offset: 10
    //   },
    //   label: false
    // },
    // yAxis: {
    //   title: {
    //     text: `Number of ${type}`,
    //     position: 'end',
    //     offset: 10
    //   },
    //   label: false
    // },
  }
  return <Pie style={style} {...config} />
}
