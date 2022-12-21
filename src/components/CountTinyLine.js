import {scheme} from '../palette'
import {TinyLine} from '@ant-design/plots'
import {ms2Str} from '../utils'

export default function ({durationByYearMonth, startDate, endDate}) {
  const data = []
  for (let year = startDate.year, month = startDate.month; year < endDate.year || month <= endDate.month; month++) {
    data.push(durationByYearMonth[`${year}-${month}`])
    // Reset month to the beginning of the next year
    if (month === 12) {
      month = 0
      year++
    }
  }
  const config = {
    data,
    height: 64,
    autoFit: true,
    color: scheme.primary,
    smooth: true,
    tooltip: false,
  };
  return <TinyLine {...config} />;
}