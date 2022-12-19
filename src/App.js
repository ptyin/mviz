import {Tabs} from 'antd'
import TagView from './views/TagView'
import TrackView from './views/TrackView'
import {scheme} from './palette'
import logo from './assets/logo.svg'
import TemporalView from "./views/TemporalView";
import StreamingHistory0 from './assets/StreamingHistory0.json'

export default function App({data}) {
  return (
    <div>
      <h1 style={{
        margin: '0',
        padding: '0 64px',
        borderBottom: `1vh solid ${scheme.bgDark}`,
        lineHeight: '7vh',
        fontWeight: 'bold',
        color: scheme.textFillDark
      }}>
        <img src={logo} alt={'logo'} style={{width: '5vh', marginRight: '32px'}}/>
        Personal Listening Record Annual Report
      </h1>
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
            label: 'Track',
            children: <TrackView data={data} />
          },
          {
            key: 'tag',
            label: 'Tag of Interests',
            children: <TagView data={data} />
          },
          {
            key: 'time',
            label: 'Time habits',
            children: <TemporalView data={StreamingHistory0} />
          },
        ]}
      />
    </div>
  );
}
