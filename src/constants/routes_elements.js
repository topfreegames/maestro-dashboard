import React from 'react'
import Home from 'containers/home'
import Dashboard from 'components/dashboard'
import SchedulersEdit from 'containers/schedulers/edit'
import SchedulersNew from 'containers/schedulers/new'
import GACallback from 'containers/ga_callback'
import SignOut from 'containers/sign_out'

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
  signOut: {
    element: SignOut,
    public: true
  },
  default: {
    element: BlankDiv,
    public: true
  }
}
