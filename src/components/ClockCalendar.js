import {Heatmap} from "@ant-design/plots";

export default function ({data}) {
  let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  let newData = [];
  for(let wk=0; wk<7; wk++)
    for(let clk=0; clk<24; clk++) {
      newData.push({
        'week': week[wk],
        'time': clk,
        'value': 0,
      })
    }
  for(let record of data) {
    let date = record.endTime.split(' ')[0];
    let time = record.endTime.split(' ')[1];
    let wk = new Date(date).getDay();
    let clk = parseInt(time.split(':')[0]);
    clk -= 8;
    if(clk<0) clk+=24;
    newData[wk*24+clk].value += record.msPlayed;
  }
  data = newData;
  const config = {
    data,
    xField: 'time',
    yField: 'week',
    colorField: 'value',
    color: ['#FFFFFF','#F08080'],
    coordinate: {
      type: 'polar',
      cfg: {
        innerRadius: 0.2,
      },
    },
    meta: {
      time: {
        type: 'cat',
      },
    },
    xAxis:{
      label:{
        formatter: (text,item,index) => {
          return text+":00";
        },
      }
    },
    yAxis: {
      top: true,
      line: null,
      grid: null,
      tickLine: null,
      label: {
        style: {
          textAlign: 'center',
        },
      },
    },
    tooltip: {
      title: 'time',
      showMarkers: false,
      formatter: (item)=>{
        let val = item.value;
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

        return {
          title:item.time+":00~"+(item.time+1)+":00("+item.week+")",
          name:"累计听歌时长",
          value:str};
      }
    },
    // interactions: [{type: 'element-active'}],
  };
  return <Heatmap {...config} />
}