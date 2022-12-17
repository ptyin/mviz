import {Tabs} from 'antd'
import TagView from './views/TagView'

export default function App({data}) {
  return (
    <div>
      <h1 style={{
        margin: '0',
        padding: '0 64px',
        color: 'white',
        background: 'left / 15% repeat url("/cardboard.png"), linear-gradient(to right, #ec4141, blue)',
        lineHeight: '8vh'
      }}>
        Personal Listening Record Annual Report
      </h1>
      <Tabs
        centered
        style={{height: '92vh'}}
        size={'large'}
        type={'card'}
        tabPosition={'left'}
        items={[
          {
            key: 'tag',
            label: 'Tag Interests',
            children: <TagView data={data} />
          },
        ]}
      />
    </div>
  );
}
