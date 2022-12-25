import {Heatmap} from "@ant-design/plots";

export default function ({data,style}) {
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
    color: ['#FFFFFF','#F08080'], //FAFAFA
    shape: 'boundary-polygon',
    reflect: 'y',
    meta: {
      day: {
        type: 'cat',
        values: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
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
        let newItem = {name:'Count',value:originalItems[0].data.count};
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
        return {name:"Duration",value:str}
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
    xAxis: {
      label:{
        formatter: (val)=>{
          if(val == 2) return 'Feb';
          else if(val == 5) return 'Mar';
          else if(val == 9) return 'Apr';
          else if(val == 14) return 'May';
          else if(val == 18) return 'Jun';
          else if(val == 24) return 'Jul';
          else if(val == 26) return 'Aug';
          else if(val == 30) return 'Sep';
          else if(val == 36) return 'Oct';
          else if(val == 39) return 'Nov';
          else if(val == 45) return 'Dec';
          else if(val == 48) return 'Jan';
          return '';
        }
      }
    }
  }
  return <Heatmap style={style} {...config} />
}