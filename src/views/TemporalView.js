import Calendar from '../components/Calendar';
import ClockCalendar from "../components/ClockCalendar";
import SlidingBarchart from "../components/SlidingBarchart";
export default function ({data}) {
  return (
    <div>
      <div>
        <Calendar data={data}/>
      </div>
      <div>
        <ClockCalendar data={data}/>
      </div>
      <div>
        <SlidingBarchart data={data}/>
      </div>
    </div>
  )
}