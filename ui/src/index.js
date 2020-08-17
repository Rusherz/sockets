import './index.scss'
import App from './App'
import React from 'react'
import Store from './Store'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

ReactDOM.render(<Provider store={Store}><App /></Provider>, document.getElementById('root'))
