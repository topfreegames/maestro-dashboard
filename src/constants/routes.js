import uniloc from 'uniloc'

export default uniloc({
  home: 'GET /',
  gACallback: 'GET /ga_callback',
  dashboard: 'GET /dashboard',
  schedulersEdit: 'GET /schedulers/:name/edit'
})
