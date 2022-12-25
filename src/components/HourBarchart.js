import {DualAxes} from "@ant-design/plots";

export default function ({data}) {

  const config = {
    data: [data,data],
    height: 200,
    xField: 'time',
    yField: ['duration','count'],
    limitInPlot: true,
    padding: 'auto',
    slider: {},
    tooltip:{
      formatter: (item) => {
        if(item.duration) {
          let val = item.duration;
          val /= 1000; val=parseInt(val);
          let s = val%60;

          val /= 60; val=parseInt(val);
          let m = val%60;

          val /= 60;
          let h = parseInt(val);
          let str = '';
          if(h!==0) {
            str = h+'h';
            str += String(m).padStart(2,'0')+'m';
            str += String(s).padStart(2,'0')+'s';
          }
          else if(m!==0) {
            str = m+'m';
            str += String(s).padStart(2,'0')+'s';
          }
          else {
            str = s+'s';
          }
          return {name:"Duration",value:str};
        }
        else {
          return {name:"Listens",value:item.count};
        }
      }
    },
    geometryOptions: [
      {
        geometry: 'column',
        color:"#F08080",
      },
      {
        geometry: 'line',
      },
    ],
    legend:{
      itemName: {
        formatter: (text, item) => {
          if (text === 'duration')
            return 'Duration';
          else
            return 'Listens';
        },
      },
    },
    yAxis: {
      duration:{
        label:{
          formatter: (val,item,index) => {
            return (val/3600000).toFixed(1)+'h';
          },
        },
      },
    },
  }
  return <DualAxes {...config} />
}