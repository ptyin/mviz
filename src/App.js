import {useState} from 'react'
import {Tabs} from 'antd'
import TagView from './views/TagView'
import TrackView from './views/TrackView'
import {scheme} from './palette'
import logo from './assets/logo.svg'
import TemporalView from "./views/TemporalView"
import StreamingHistory0 from './assets/StreamingHistory0.json'
import HistorySelector from './components/HistorySelector'
import statistics from './statistics'
import FetchingProgress from './components/FetchingProgress'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState(StreamingHistory0)
  const [data, setData] = useState(statistics())

  const loadingView = (
    <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <FetchingProgress history={history} onLoaded={info => {
        if (info) {
          setData(statistics(info))
          setLoading(false)
        }
      }} />
    </div>
  )
  return loading ? loadingView : (
    <div>
      <div style={{
        display: 'flex', margin: '0', padding: '0 64px', borderBottom: `1vh solid ${scheme.bgDark}`,
        height: '8vh', alignItems: 'center'
      }}>
        <img src={logo} alt={'logo'} style={{width: '5vh', marginRight: '32px'}}/>
        <h1 style={{
          margin: '0',
          fontWeight: 'bold',
          color: scheme.textFillDark
        }}>
          Personal Listening Record Annual Report
        </h1>
        <HistorySelector style={{marginLeft: 'auto'}} onOk={val => {
          setLoading(true)
          setHistory(val)
        }}/>
      </div>
      <Tabs
        centered
        style={{height: '92vh'}}
        size={'large'}
        type={'card'}
        tabBarStyle={{
          boxShadow: '0 2px 8px rgb(0 0 0 / 9%)',
        }}
        tabPosition={'left'}
        tabBarExtraContent={
        <div style={{color: scheme.textFillDark, fontWeight: 'bold'}}>mviz ©2022</div>
      }
        items={[
          {
            key: 'track',
            label: 'General stats',
            children: <TrackView data={data} />
          },
          {
            key: 'tag',
            label: 'Tag of interests',
            children: <TagView data={data} />
          },
          {
            key: 'time',
            label: 'Time habits',
            children: <TemporalView data={history} />
          },
        ]}
      />
    </div>
  );
}
