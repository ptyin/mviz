import {Heatmap} from "@ant-design/plots";

export default function ({data,style}) {
  const date2Count = {}

  let firstDay = data[0].endTime.split(' ')[0];
  let lastDay = data[data.length-1].endTime.split(' ')[0];
  let startTamp = new Date(firstDay).getTime();
  let endTamp = new Date(lastDay).getTime();

  let week=0, Sun=new Date(firstDay).getMonth()+'-'+new Date(firstDay).getDate();
  for (let tamp=startTamp; tamp<=endTamp; tamp+=1000*60*60*24) {
    let today = new Date(tamp);
    let year = today.getFullYear();
    let month = String(today.getMonth()+1).padStart(2,'0');
    let date = String(today.getDate()).padStart(2,'0');
    let str = year+"-"+month+"-"+date;
    if(today.getDay()==0) {
      week ++;
      Sun = today.getMonth()+'-'+today.getDate();
    }
    date2Count[str]= {
      date: str,
      day: today.getDay(),
      week: week+"-"+Sun,
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
    color: ['#FAFAFA','#F08080'], //FAFAFA
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
        autoHide:false,
        formatter: (val) => {
          let Month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          let month = val.split('-')[1];
          let date = val.split('-')[2];
          if(date>8&&date<=15)
            return Month[month];
          return '';
        }
      }
    }
  }
  return <Heatmap style={style} {...config} />
}