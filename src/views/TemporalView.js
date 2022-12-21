import Calendar from '../components/Calendar';
import HourBarchart from "../components/HourBarchart";
import ClockCalendar from "../components/ClockCalendar";
import SlidingBarchart from "../components/SlidingBarchart";
import TimePie from "../components/TimePie";
export default function ({data}) {
  console.log(data);
  return (
    <div>
      <div>
        <h1>听歌日历热度图</h1>
        <Calendar data={data}/>
      </div>

      <div>
        <h1>每天听歌时间分布</h1>
        <HourBarchart data={data}/>
      </div>

      <div>
        <h1>每周听歌时间分布</h1>
        <ClockCalendar data={data}/>
      </div>

      <div>
        <h1>年度听歌时间分布</h1>
        <SlidingBarchart data={data}/>
      </div>

      <div>
        <h1>每周听歌时间占比</h1>
        <TimePie data={data} />
      </div>
    </div>
  )
}