import React, { useState } from 'react';
import TagTimeline from './TagTimeline';

function selectTags2SelectTags2dateToMostTagInfo(selectedTags, tag2CountByYearMonth) {
  let dateList = []
  let dateSet = new Set()

  // console.log("selectedTags in TagTimelineSelector: ", selectedTags)
  // console.log("tag2CountByYearMonth['HIP HOP'] in TagTimelineSelector: ", tag2CountByYearMonth["HIP HOP"])

  for (let tag of selectedTags) {
    if (tag2CountByYearMonth[tag]) {
      // console.log("tag", tag, "tag2tag2CountByYearMonth[tag]", tag2CountByYearMonth[tag])
      for (let date in tag2CountByYearMonth[tag]) {
        if (!dateSet.has(date)) {
          dateList.push(date)
          dateSet.add(date)
        }
      }
    }
  }

  // console.log("dateList in TagTimelineSelector: ", dateList)

  function dateStringToMonthRank(dateStr) {
    let yearStr = dateStr.split('-')[0]
    let monthStr = dateStr.split('-')[1]

    return Number(yearStr) * 12 + Number(monthStr)
  }

  dateList.sort((a, b) => dateStringToMonthRank(a) - dateStringToMonthRank(b))

  // Calc the most popular tag of each date

  let dateToMostTag = []

  for (let date of dateList) {
    let maxTagCount = -1
    let maxTag = ''
    for (let tag of selectedTags) {
      if (tag2CountByYearMonth[tag] && 
        tag2CountByYearMonth[tag][date] && 
        tag2CountByYearMonth[tag][date] > maxTagCount) {
        maxTagCount = tag2CountByYearMonth[tag][date]
        maxTag = tag
      }
    }
    dateToMostTag[date] = { date, maxTag, maxTagCount }
  }

  let dateToMostTagInfo = { dateList, dateToMostTag } 

  return dateToMostTagInfo
}

export var selectTagsCallback = undefined

export default function ({tag2CountByYearMonth, tagCountSorted, style}) {

  // console.log("tag2CountByYearMonth['HIP HOP'] in TagTimelineSelector: ", tag2CountByYearMonth["HIP HOP"])

  const [dateToMostTagInfo, setDateToMostTagInfo] = useState({dateList: [], dateToMostTag: []})

  selectTagsCallback = (selectTags) => {
    // console.log("tagtimelineSelector callback arg: ", selectTags)
    setDateToMostTagInfo(selectTags2SelectTags2dateToMostTagInfo(selectTags, tag2CountByYearMonth))
  }

  // Get all appeared date in dateset

  // console.log("dateToMostTagInfo", dateToMostTagInfo)

  return (<TagTimeline 
    style={style}
    dateToMostTagInfo={dateToMostTagInfo}/>)
}