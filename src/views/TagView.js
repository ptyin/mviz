import TagCloud from '../components/TagCloud'
import TagExplorer from '../components/TagExplorer'
import timeline from '../assets/timeline.png'

export default function ({data}) {
  return (
    <div style={{
      height: '92vh',
      display: 'flex',
      flexDirection: 'column'
    }}
    >
      <div style={{flexBasis: '60%', display: 'flex', flexDirection: 'row'}}>
        <TagCloud style={{flexBasis: '60%'}} data={data.tag2Count} />
        <TagExplorer style={{flexBasis: '40%', height: '100%'}} tag2Count={data.tag2Count}
                     tag2Duration={data.tag2Duration}/>
      </div>
      <div style={{flexBasis: '40%', textAlign: 'center'}}>
        <img style={{width: '100%', maxHeight: '250px'}} src={timeline} alt={'timeline'}/>
      </div>

    </div>
  )
}