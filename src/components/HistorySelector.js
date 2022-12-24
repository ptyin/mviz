import {Button, Modal} from 'antd'
import {useState} from 'react'
import Dragger from 'antd/es/upload/Dragger'

export default function ({onOk, style}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const files = {}
  return (
    <div style={style}>
      <Button type='primary' shape='round'
              onClick={() => setIsModalOpen(true)}
      >
        Analyze your own
      </Button>
      <Modal title='Select your history file.'
             destroyOnClose
             open={isModalOpen}
             onOk={() => {
               setIsModalOpen(false)
               if (onOk) {
                 const history = Object.values(files).reduce((a, b) => a.concat(b))
                 onOk(history)
               }
             }}
             onCancel={() => setIsModalOpen(false)}
      >
        <Dragger accept={'application/json'}
                 beforeUpload={file => {
                   const reader = new FileReader()
                   // noinspection JSCheckFunctionSignatures
                   reader.readAsText(file)
                   reader.onload = result => {
                     // noinspection JSUnresolvedVariable,JSCheckFunctionSignatures
                     files[file.uid] = JSON.parse(result.target.result)
                   }
                   return false
                 }}
                 onRemove={({uid}) => delete files[uid]}
        >
          <p className="ant-upload-text">Click or drag file to this area</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. The file must conform to the format given by
            <a href={'//github.com/PTYin/mviz'}> here</a>.
          </p>
        </Dragger>
      </Modal>
    </div>
  )
}