import { Scatter } from '@ant-design/plots';

export default function ({data, color, style}) {
  const yMedian = data.sort((a, b) => a.count -b.count)[Math.floor(data.length / 2)]
  // const xAvg = data.map(x => x.playCount).reduce((a, b) => a + b) / data.length
  // const yAvg = data.map(x => x.count).reduce((a, b) => a + b) / data.length
  data = data.sort((a, b) => a.playCount -b.playCount).slice(Math.max(0, data.length - 100), data.length)
  for (let i = 0; i < data.length; i++)
    data[i].popularity = i
  const config = {
    data,
    padding: 30,
    xField: 'popularity',
    yField: 'count',
    colorField: 'type',
    color: color,
    size: [2, 12],
    sizeField: 'duration',
    shape: 'circle',
    yAxis: {
      nice: false,
      title: {
        text: 'Listens',
        position: 'end',
        offset: 10
      },
      grid: {
        line: {
          style: {
            stroke: '#eee',
          },
        },
      },
      line: {
        style: {
          stroke: '#aaa',
        },
      },
      label: false
    },
    tooltip: {
      fields: ['name', 'count', 'durationStr', 'playCount', 'listeners'],
    },
    legend: {
      position: 'top',
    },
    xAxis: {
      nice: false,
      title: {
        text: 'Popularity',
        position: 'end',
        offset: 10
      },
      grid: {
        line: {
          style: {
            stroke: '#eee',
          },
        },
      },
      line: false,
      label: false
    },
    brush: {
      enabled: true,
      mask: {
        style: {
          fill: 'rgba(255,0,0,0.15)',
        },
      },
    },
  };

  return <Scatter style={style} {...config} />;
};
