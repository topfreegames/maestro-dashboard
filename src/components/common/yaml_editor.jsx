import React from 'react'
import { css } from 'glamor'
import Codemirror from 'react-codemirror'
import 'codemirror/mode/yaml/yaml'
import styles from 'constants/styles'

const baseOptions = {
  lineNumbers: true,
  tabSize: 2,
  mode: 'yaml',
  scrollbarStyle: 'native'
}

const YamlEditor = ({ value, handleChange, options = {} }) =>
  <div {...YamlEditor.styles}>
    <Codemirror
      value={value}
      onChange={handleChange}
      options={{
        ...baseOptions,
        ...options
      }}
    />
  </div>

YamlEditor.styles = css({
  '& *': {
    fontFamily: `'Roboto Mono', monospace !important`,
    fontSize: styles.fontSizes['3']
  },

  '> .ReactCodeMirror': {
    position: 'relative'
  }
})

export default YamlEditor
