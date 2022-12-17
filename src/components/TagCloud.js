import { WordCloud } from '@ant-design/plots'
import * as d3 from 'd3-scale-chromatic'

export default function ({data, style}) {
  data = Object.keys(data).map(tag => ({tag, count: data[tag]}))
    .sort((a, b) => b['count'] - a['count'])
    .slice(0, 100)
  const maxCount = data[0].count, minCount = data[data.length - 1].count
  const config = {
    data,
    wordField: 'tag',
    weightField: 'count',
    color: word => d3.interpolatePurples(0.25 + (word?.datum?.count - minCount || 0) / maxCount / 2),
    autoFit: true,
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [24, 80],
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
  };

  return <WordCloud style={style} {...config} />
};

