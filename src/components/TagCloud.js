import { WordCloud } from '@ant-design/plots'
// import * as d3 from 'd3-scale-chromatic'
import {scheme} from '../palette'
import {clickedTag} from './TagPieSelector'

export default function ({data, style}) {
  data = Object.keys(data).map(tag => ({tag, count: data[tag]}))
    .sort((a, b) => b['count'] - a['count'])
    .slice(0, 200)
  // const maxCount = data[0].count, minCount = data[data.length - 1].count
  const config = {
    data,
    wordField: 'tag',
    weightField: 'count',
    // color: word => d3.interpolateOranges(0.5 + (word?.datum?.count - minCount || 0) / maxCount / 3),
    color: scheme.primary,
    autoFit: true,
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [8, 32],
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
    state: {
      active: {
        style: {
          lineWidth: 3,
        },
      },
    },
    onReady: (plot) => {
      plot.on('element:click', e => {
        const datum = e?.data?.data?.datum
        console.log('e', datum)
        clickedTag(datum.tag)
      })
    }
  }

  return <WordCloud style={style} {...config} />
};

