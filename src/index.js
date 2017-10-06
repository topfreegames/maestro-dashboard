import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Bootloader from './app'
require('es6-promise').polyfill()
require('isomorphic-fetch')

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Bootloader />
    </AppContainer>,
    document.getElementById('app')
  )
}

render(Bootloader)

if (module.hot) {
  module.hot.accept('./app', () => { render(Bootloader) })
}
