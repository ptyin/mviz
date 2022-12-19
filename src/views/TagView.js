import TagCloud from '../components/TagCloud'
import TagExplorer from '../components/TagExplorer'
import {Divider, Tag} from 'antd'
import * as d3 from 'd3-scale-chromatic'
import TagLine from '../components/TagLine'
import TagTimeline from '../components/TagTimeline'
import TagPie from '../components/TagPie'
import {scheme} from '../palette'

export default function ({data}) {
  const tagCountSorted = Object.keys(data.tag2Count).map(tag => ({tag, count: data.tag2Count[tag]}))
    .sort((a, b) => b['count'] - a['count'])
  const topTagList = tagCountSorted
    .slice(0, 5)
    .map(
      ({tag}, i) =>
        <Tag key={tag} color={d3.schemeSet3[i]} style={{color: scheme.textFillDark}}>{tag}</Tag>
    )
  return (
    <div style={{
      height: '92vh',
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <div style={{
        flexBasis: '40%', display: 'flex', flexDirection: 'column',
        background: 'white', boxShadow: '0 2px 8px rgb(0 0 0 / 9%)', width: '100%', margin: 'auto'
      }}>
        <h2 style={{textAlign: 'center', margin: 0, fontWeight: 'bold',}}>
          Tag Cloud
        </h2>
        <Divider style={{margin: '0 0 16px 0'}} />
        <div style={{flexBasis: '80%', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap',}}>
          <TagCloud style={{flexBasis: '45%'}} data={data.tag2Count} />
          <TagPie style={{flexBasis: '45%'}} />
        </div>
      </div>
      <div style={{
        flexBasis: '40%', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-evenly', width: '100%', margin: 'auto'
      }}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <h2 style={{color: scheme.textFillDark, margin: '16px', fontWeight: 'bold',}}>Tags of year</h2>
          <div style={{display: 'flex'}}>
            {topTagList}
          </div>
        </div>
        <Divider style={{margin: '0 0 16px 0'}} />
        <div style={{background: 'white', boxShadow: '0 2px 8px rgb(0 0 0 / 9%)'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
            <h2 style={{
              textAlign: 'center', writingMode: 'vertical-rl', transform: 'rotate(180deg)',
              margin: 0, background: scheme.bgDark, color: 'white', lineHeight: '64px', fontWeight: 'bold',
            }}>
              Tag Timeline
            </h2>
            <TagTimeline style={{flexBasis: '10%', marginTop: '16px'}} />
            <TagLine style={{flexBasis: '40%', marginTop: '16px'}}
                     tag2CountByYearMonth={data.tag2CountByYearMonth}
                     tagCountSorted={tagCountSorted}/>
            <TagExplorer style={{flexBasis: '40%'}}
                         tag2Count={data.tag2Count}
                         tag2Duration={data.tag2Duration}
                         tag2CountByYearMonth={data.tag2CountByYearMonth}
                         startDate={data.startDate}
                         endDate={data.endDate}
            />
          </div>
        </div>
      </div>
    </div>
  )
}