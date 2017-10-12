import React from 'react'
import { css } from 'glamor'
import { Header as CommonHeader, Logo, AutoComplete } from 'components/common'
import styles from 'constants/styles'

const Left = ({
  clusterName,
  handleClusterNameChange
}) => (
  <div {...Left.styles}>
    <Logo />
    <AutoComplete
      value={clusterName}
      handleChange={handleClusterNameChange}
      placeholder='Select a Cluster'
      options={['North America', 'Europe']}
    />
  </div>
)

Left.styles = css({
  '& input': {
    fontSize: styles.fontSizes['4'],
  },

  '> div + div': { marginLeft: '30px' }
})

const Right = ({

}) => (
  <div {...Right.styles}>
    <button>
      <i className='fa fa-television' />
    </button>
    <button>
      <i className='fa fa-sign-out' />
    </button>
  </div>
)

Right.styles = css({
  '> button + button': {
    marginLeft: '30px'
  },

  '& i': {
    color: styles.colors.gray_100,
    fontSize: styles.fontSizes['6']
  }
})

class Header extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      clusterName: ''
    }
  }

  handleClusterNameChange = e => {
    this.setState({ clusterName: e.target.value })
  }

  render = () => (
    <CommonHeader
      left={
        <Left
          clusterName={this.state.clusterName}
          handleClusterNameChange={this.handleClusterNameChange}
        />
      }
      right={
        <Right />
      }
    />
  )
}

export default Header
