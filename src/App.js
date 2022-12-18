import {Tabs} from 'antd'
import TagView from './views/TagView'

export default function App({data}) {
  return (
    <div>
      <Tabs
        centered
        style={{height: '95vh'}}
        size={'large'}
        type={'card'}
        tabPosition={'left'}
        tabBarExtraContent={
        <div style={{color: '#743481', fontWeight: 'bold'}}>mviz ©2022</div>
      }
        items={[
          {
            key: 'tag',
            label: 'Tag of Interests',
            children: <TagView data={data} />
          },
          {
            key: 'aat',
            label: 'Artists-Albums-Track',
            // children: <TagView data={data} />
          },
          {
            key: 'time',
            label: 'Time habits',
          },
        ]}
      />

      <h1 style={{
        textAlign: 'right',
        margin: '0',
        padding: '0 64px',
        color: 'white',
        background: 'left / 15% repeat url("/cardboard.png"), linear-gradient(to right, #743481, #743481)',
        lineHeight: '5vh'
      }}>
        Personal Listening Record Annual Report
      </h1>
    </div>
  );
}
