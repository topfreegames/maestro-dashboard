import store from 'reducers'
import { set } from 'actions/snackbar'

export const textFromBoolean = (boolean, { isTrue, isFalse }) =>
  store.dispatch(
    set({
      text: boolean ? isTrue : isFalse,
      isError: !boolean
    })
  )

export default {
  textFromBoolean
}
