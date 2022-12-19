import {Heatmap} from "@ant-design/plots";

export default function ({data}) {
  console.log("calendar_QAQ");
  const date2Count = {}

  let firstDay = data[0].endTime.split(' ')[0];
  let lastDay = data[data.length-1].endTime.split(' ')[0];
  let startTamp = new Date(firstDay).getTime();
  let endTamp = new Date(lastDay).getTime();

  let week=0;
  for (let tamp=startTamp; tamp<=endTamp; tamp+=1000*60*60*24) {
    let today = new Date(tamp);
    if(today.getDay()==0)
      week ++;
    let year = today.getFullYear();
    let month = String(today.getMonth()+1).padStart(2,'0');
    let date = String(today.getDate()).padStart(2,'0');
    let str = year+"-"+month+"-"+date;
    date2Count[str]= {
      date: str,
      day: today.getDay(),
      week: week,
      duration: 0,
      count: 0
    }
  }
  for (let record of data) {
    let date = record.endTime.split(' ')[0];
    let duration = record.msPlayed;
    date2Count[date].duration += duration;
    date2Count[date].count += 1;
  }

  let calendarData = [];
  for (let key in date2Count) {
    // if(date2Count[key].count!=0)
      calendarData.push(date2Count[key]);
  }
  data = calendarData;
  const config = {
    data,
    xField: 'week',
    yField: 'day',
    colorField: 'duration',
    color: ['#FFFFFF','#F08080'],
    shape: 'boundary-polygon',
    reflect: 'y',
    meta: {
      day: {
        type: 'cat',
        values: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      },
      week: {
        type: 'cat',
      },
      date: {
        type: 'cat',
      },
      duration: {
      }
    },
    tooltip: {
      fields:['duration','count'],
      title: 'date',
      showMarkers: false,
      customItems: (originalItems) => {
        let newItem = {name:'切歌次数',value:originalItems[0].data.count};
        originalItems.push(newItem);
        return originalItems;
      },
      formatter: (item)=>{
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
        return {name:"听歌时长",value:str}
      }
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
    yAxis: {
      grid: null,
    },
  }
  return <Heatmap {...config} />
}