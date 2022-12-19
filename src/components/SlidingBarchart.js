import {DualAxes} from "@ant-design/plots";

export default function ({data}) {
  console.log("sliding Barchart");
  console.log(data);
  let newData = [];
  for(let record of data) {
    let date = record.endTime.split(' ')[0];
    let cnt = newData.length;
    if(cnt===0 || newData[cnt-1].time!==date) {
      newData.push({
        'time': date,
        'duration': record.msPlayed,
        'count':1
      });
    }
    else {
      newData[cnt-1].duration += record.msPlayed;
      newData[cnt-1].count++;
    }
  }
  data = newData;
  console.log(data);
  const config = {
    data: [data,data],
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
          return {name:"听歌时长",value:str};
        }
        else {
          return {name:"切歌次数",value:item.count};
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
  }
  return <DualAxes {...config} />
}