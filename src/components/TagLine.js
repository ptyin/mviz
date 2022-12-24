import {Line} from '@ant-design/charts'
import {useState, useEffect} from 'react'
import {Select} from 'antd'
import * as d3 from 'd3-scale-chromatic'
import { selectTagsCallback } from './TagTimelineSelector'

export default function ({tag2CountByYearMonth, tagCountSorted, style}) {
  const [selectedTags, setSelectedTags] = useState(tagCountSorted.slice(0, 5).map(({tag}) => tag))
  const [lineData, setLineData] = useState([])
  const options = tagCountSorted.map(({tag}) => ({label: tag, value: tag}))
  useEffect(() => {
    let temp = []
    for (let tag of selectedTags)
      temp = temp.concat(
        Object.keys(tag2CountByYearMonth[tag]).map(date => ({tag, date, count: tag2CountByYearMonth[tag][date]}))
      )
    selectTagsCallback(selectedTags)
    setLineData(temp)
  }, [selectedTags])
  const config = {
    data: lineData,
    height: 250,
    color: d3.schemeSet3,
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