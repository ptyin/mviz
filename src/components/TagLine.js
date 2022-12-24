import {Line} from '@ant-design/charts'
import {useState, useEffect} from 'react'
import {Select} from 'antd'
import * as d3 from 'd3-scale-chromatic'
import { selectTagsCallback } from './TagTimelineSelector'

var tag2color = []

export default function ({tag2CountByYearMonth, tagCountSorted, style}) {
  const [selectedTags, setSelectedTags] = useState(tagCountSorted.slice(0, 5).map(({tag}) => tag))
  const [lineData, setLineData] = useState([])
  const [lineColor, setLineColor] = useState([])
  const options = tagCountSorted.map(({tag}) => ({label: tag, value: tag}))
  useEffect(() => {
    let temp = []
    for (let tag of selectedTags)
      temp = temp.concat(
        Object.keys(tag2CountByYearMonth[tag]).map(date => ({tag, date, count: tag2CountByYearMonth[tag][date]}))
      )
    selectTagsCallback(selectedTags)
    setLineData(temp)

    let selectTagSet = new Set(selectedTags)
    let uncoloredTagSet = new Set(selectedTags)
    let unusedColorSet = new Set(d3.schemeSet3)
    let new_tag2color = []
    for (let tag in tag2color) {
      if (selectTagSet.has(tag)) {
        new_tag2color[tag] = tag2color[tag]
        unusedColorSet.delete(tag2color[tag])
        uncoloredTagSet.delete(tag)
      }
    }

    let index = 0

    for (let tag of uncoloredTagSet)  {
      if (unusedColorSet.size > 0) {
        let colorSelect = undefined
        for (let color of unusedColorSet) {
          colorSelect = color
          break
        }
        new_tag2color[tag] = colorSelect
        unusedColorSet.delete(colorSelect)
      } else {
        new_tag2color[tag] = d3.schemeSet3[(index ++) % d3.schemeSet3.size]
      }
    }

    tag2color = new_tag2color
    let new_lineColor = []

    for (let tag of selectedTags) {
      new_lineColor.push(tag2color[tag])
    }

    // console.log("new lineColor", new_lineColor)
    setLineColor(new_lineColor)

    // console.log("selectedTags", selectedTags)
    // console.log("tag2color", tag2color)
  }, [selectedTags])

  const config = {
    data: lineData,
    height: 250,
    color: lineColor,
    padding: 'auto',
    xField: 'date',
    yField: 'count',
    seriesField: 'tag',
    xAxis: {
      tickCount: 5,
    },
    slider: {
      start: 0,
      end: 1,
    },
  }

  // noinspection JSValidateTypes
  return (
    <div style={style}>
      <Select
        mode="tags"
        maxTagCount={12}
        style={{ width: '100%' }}
        placeholder="Tags"
        defaultValue={selectedTags}
        onChange={(x) => {
          setSelectedTags(x)
        }}
        options={options}
      />
      <Line {...config} />
    </div>
  )
}