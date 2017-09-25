import React from 'react'
import Home from 'containers/home'
import Dashboard from 'containers/dashboard'
import GACallback from 'containers/ga_callback'

const BlankDiv = () => (<div />)

export default {
  home: {
    element: Home
  },
  dashboard: {
    element: Dashboard
  },
  gACallback: {
    element: GACallback
  },
  default: {
    element: BlankDiv
  }
}
