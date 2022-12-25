import Calendar from '../components/Calendar';
import HourBarchart from "../components/HourBarchart";
import ClockCalendar from "../components/ClockCalendar";
import SlidingBarchart from "../components/SlidingBarchart";
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
    // hour -= 8;
    // if(hour<0) hour+=24;
    dailyData[hour].duration += record.msPlayed;
    dailyData[hour].count += 1;
  }
  let maxHour = 0
  for(let hour=0; hour<24; hour++) {
    if(dailyData[hour].duration > dailyData[maxHour].duration)
      maxHour = hour;
  }

  let week = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
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
    // clk -= 8;
    // if(clk<0) clk+=24;
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
      height: '92vh',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    }}>
      <div style={{
        flexBasis: '50%',
        margin: '16px 0',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor:"white",
        boxShadow:"0 2px 8px rgb(0 0 0 / 9%)",
        justifyContent: 'space-evenly'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flexBasis: "55%",
          margin: "13px",
        }}>
          <h2 style={{
            flexBasis: '10%',
            paddingTop: '10px',
            fontWeight: 'bold',
          }}>Calendar heat map</h2>
          <div style={{flexBasis: '10%'}} className={'temp1'}>Record a year of luck and goodness :)</div>
          <Calendar style={{flexBasis: '80%'}} data={data}/>
        </div>
        <div style={{
          flexBasis: '40%',
          display: 'flex',
          margin: "13px",
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }}>
          <div>
            <h2 style={{
              textAlign: 'center', lineHeight: '64px', fontWeight: 'bold',
            }}>Weekly listens</h2>
            <div className={'temp1'}>{clockData[maxPos].week} {clockData[maxPos].time+":00"}, see you then!</div>
          </div>
          <ClockCalendar style={{height: '100%'}} data={clockData}/>
        </div>
      </div>
      <div style={{
        flexBasis: '45%',
        display: "flex",
        flexDirection: "column",
        justifyContent: 'space-evenly'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flexBasis: "30%",
          justifyContent: 'center',
          // backgroundColor:"white",
          // boxShadow:"0 2px 8px rgb(0 0 0 / 9%)",
          margin: "13px",
        }}>
          <h2 style={{
            // backgroundColor: "#F2F2F2",
            paddingTop: '10px',
            fontWeight: 'bold',
          }}>Annual listens</h2>
          <div className={'temp1'}>
            You listened the longest time on {maxDurationDate}, do you remember the story of this day?
          </div>
          <div style={{
            padding:"20px",
          }}>
            <SlidingBarchart data={annualData}/>
          </div>
        </div>
        <div style={{
          flexBasis: '30%',
          margin: "13px",
        }}>
          <h2 style={{
            paddingTop: '10px',
            fontWeight: 'bold',
          }}>Daily listens</h2>
          <div className={'temp1'}>
            You like to listen to music at {maxHour+":00"} every day.
            Is this your most leisure time, or the most energetic time?
          </div>
          <HourBarchart data={dailyData}/>
        </div>
      </div>
    </div>
  )
}