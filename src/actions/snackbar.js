import { snackbar } from 'constants/actions'

export const set = payload =>
  dispatch => dispatch({ type: snackbar.set, ...payload })

export default {
  set
}
