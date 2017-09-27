import React from 'react'
import Home from 'containers/home'
import Dashboard from 'containers/dashboard'
import SchedulersEdit from 'containers/schedulers/edit'
import SchedulersNew from 'containers/schedulers/new'
import GACallback from 'containers/ga_callback'

const BlankDiv = () => (<div />)

export default {
  home: {
    element: Home,
    public: true
  },
  dashboard: {
    element: Dashboard
  },
  schedulersEdit: {
    element: SchedulersEdit
  },
  schedulersNew: {
    element: SchedulersNew
  },
  gACallback: {
    element: GACallback,
    public: true
  },
  default: {
    element: BlankDiv,
    public: true
  }
}
