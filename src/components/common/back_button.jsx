import React from 'react'
import history from 'constants/history'

const back = () => history.go(-1)

export default () => <button onClick={back}>Back</button>
