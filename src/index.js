import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'antd/dist/antd.css'
import App from './App'
import statistics from './statistics'

const data = statistics()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App data={data}/>);
