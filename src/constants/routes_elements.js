import React from 'react'
import Home from 'containers/home'
import Dashboard from 'containers/dashboard'
import SchedulersEdit from 'containers/schedulers/edit'
import GACallback from 'containers/ga_callback'

const BlankDiv = () => (<div />)

export default {
  home: {
    element: Home
  },
  dashboard: {
    element: Dashboard
  },
  schedulersEdit: {
    element: SchedulersEdit
  },
  gACallback: {
    element: GACallback
  },
  default: {
    element: BlankDiv
  }
}
