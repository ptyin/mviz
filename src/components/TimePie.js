import {Pie} from '@ant-design/plots'
function duration2str(val) {
  val /= 1000;
  val=parseInt(val);
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
  return str;
}
export default function ({data}) {
  let newData = [];
  let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  for (let wk=0; wk<7; wk++) {
    newData.push({
      'week': week[wk],
      'duration': 0,
      'per': 0,
    });
  }
  let tot = 0;
  for(let record of data) {
    let date = record.endTime.split(' ')[0];
    let wk = new Date(date).getDay();
    newData[wk].duration += record.msPlayed;
    tot += record.msPlayed;
  }
  for(let wk=0; wk<7; wk++) {
    newData[wk].per = newData[wk].duration/tot;
  }
  data = newData;
  const config = {
    data,
    angleField: 'duration',
    colorField: 'week',
    radius: 0.9,
    tooltip:{
      title: 'week',
      showTitle: true,
      fields: ['duration','per'],
      customItems: (originalItems) => {
        originalItems[0].name = "听歌时长";
        originalItems[0].value = duration2str(originalItems[0].value);
        originalItems[1].name = "时长占比";
        originalItems[1].value = (originalItems[1].value*100).toFixed(1)+"%";
        return originalItems;
      }
      // formatter: (item) => {
      //   console.log(item);
      //   let str = duration2str(item.duration);
      // },
    },
    label: {
      type: 'inner',
      formatter: (item) => {
        let str = (item.percent*100).toFixed(1)+"%";
        return str;
      }
    },
  }
  return <Pie {...config} />
}