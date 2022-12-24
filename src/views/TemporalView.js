import Calendar from '../components/Calendar';
import HourBarchart from "../components/HourBarchart";
import ClockCalendar from "../components/ClockCalendar";
import SlidingBarchart from "../components/SlidingBarchart";
import TimePie from "../components/TimePie";
function getNewData(data){
  let annualData = [];
  for(let record of data) {
    let date = record.endTime.split(' ')[0];
    let cnt = annualData.length;
    if(cnt===0 || annualData[cnt-1].time!==date) {
      annualData.push({
        'time': date,
        'duration': record.msPlayed,
        'count':1
      });
    }
    else {
      annualData[cnt-1].duration += record.msPlayed;
      annualData[cnt-1].count++;
    }
  }
  let maxDuration = 0, maxDurationDate = 0
  for(let record of annualData) {
    if(record.duration >= maxDuration) {
      maxDuration = record.duration;
      maxDurationDate = record.time;
    }
  }

  let dailyData = [];
  for(let hour=0; hour<24; hour++) {
    dailyData.push({
      'time': hour+":00",
      'duration': 0,
      'count': 0,
    });
  }
  for(let record of data) {
    let time = record.endTime.split(' ')[1];
    let hour = parseInt(time.split(':')[0]);
    hour -= 8;
    if(hour<0) hour+=24;
    dailyData[hour].duration += record.msPlayed;
    dailyData[hour].count += 1;
  }
  let maxHour = 0
  for(let hour=0; hour<24; hour++) {
    if(dailyData[hour].duration > dailyData[maxHour].duration)
      maxHour = hour;
  }

  let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  let clockData = [];
  for(let wk=0; wk<7; wk++)
    for(let clk=0; clk<24; clk++) {
      clockData.push({
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
    clockData[wk*24+clk].value += record.msPlayed;
  }
  let maxPos = 0;
  for(let i=0; i<7*24; i++) {
    if(clockData[i].value > clockData[maxPos].value)
      maxPos = i;
  }
  return {
    annualData, dailyData, clockData,
    maxDurationDate, maxHour, maxPos,
  }
}
export default function ({data}) {
  let newData = getNewData(data);
  let annualData = newData.annualData;
  let dailyData = newData.dailyData;
  let clockData = newData.clockData;
  let maxDurationDate = newData.maxDurationDate;
  let maxHour = newData.maxHour;
  let maxPos = newData.maxPos;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <div style={{
          flexBasis: "50%",
          justifyContent: 'center',
          // backgroundColor:"white",
          // boxShadow:"0 2px 8px rgb(0 0 0 / 9%)",
          margin: "13px",
        }}>
          <h2 style={{
            paddingTop: '10px',
            fontWeight: 'bold',
          }}>Calendar heat map</h2>
          <div className={'temp1'}>记录一年的幸运与美好~</div>
          <div style={{
            // backgroundColor:"#C6C6C6",
            padding:"20px",
          }}>
            <Calendar style={{height:'25vh'}} data={data}/>
          </div>
        </div>
        <div style={{
          flexBasis: "50%",
          justifyContent: 'center',
          // backgroundColor:"white",
          // boxShadow:"0 2px 8px rgb(0 0 0 / 9%)",
          margin: "13px",
        }}>
          <h2 style={{
            // backgroundColor: "#F2F2F2",
            paddingTop: '10px',
            fontWeight: 'bold',
          }}>Annual listening time distribution</h2>
          <div className={'temp1'}>你在 {maxDurationDate} 听歌最多，这天的故事你还记得吗？</div>
          <div style={{
            padding:"20px",
          }}>
          <SlidingBarchart style={{height:'25vh'}} data={annualData}/>
          </div>
        </div>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "row",
      }}>
        <div style={{
          flexBasis: '50%',
          margin: "13px",
        }}>
          <h2 style={{
            paddingTop: '10px',
            fontWeight: 'bold',
          }}>Daily listening time distribution</h2>
          <div className={'temp1'}>你喜欢在每天{maxHour+":00"}听歌，这是你最清闲的时刻，还是最有干劲的时候呢？</div>
          <HourBarchart style={{height:'25vh'}} data={dailyData}/>
        </div>
        <div style={{
          flexBasis: '50%',
          margin: "13px",
        }}>
          <h2 style={{
            paddingTop: '10px',
            fontWeight: 'bold',
          }}>Weekly listening time distribution</h2>
          <div className={'temp1'}>{clockData[maxPos].week}{clockData[maxPos].time+":00"}，准时与你相遇！</div>
            <ClockCalendar style={{height:'25vh'}} data={clockData}/>
        </div>

        {/*<div>*/}
        {/*  <TimePie data={data} />*/}
        {/*</div>*/}
      </div>
    </div>
  )
}