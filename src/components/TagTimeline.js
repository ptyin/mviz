import { Timeline } from 'antd';

export default function ({dateToMostTagInfo, style}) {

  // Get all appeared date in dateset

  let dateList = dateToMostTagInfo.dateList
  let dateToMostTag = dateToMostTagInfo.dateToMostTag

  let timelineItems = []
  let previousMostTag = undefined

  let arrayIndex = 0

  for (let date of dateList) {
    let maxTag = dateToMostTag[date].maxTag
    if (!previousMostTag || previousMostTag != maxTag || date == dateList[dateList.length - 1]) {
      let timelineItem = <Timeline.Item key={arrayIndex} label={date}>{dateToMostTag[date].maxTag}</Timeline.Item>
      arrayIndex ++
      timelineItems.push(timelineItem)
      previousMostTag = maxTag
    }
  }

  // console.log("timelineItem", timelineItems)

  timelineItems.reverse()

  let timeline = (
  <Timeline style={style} mode={'left'}>
    {timelineItems}
  </Timeline>)

  return timeline
}