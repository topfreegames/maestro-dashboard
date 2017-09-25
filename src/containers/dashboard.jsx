import React from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor'

class Dashboard extends React.Component {
  componentDidMount = async () => {
    const response = await fetch(`${process.env.MAESTRO_URL}/scheduler`, {
      headers: {
        'Authorization': `Bearer ${this.props.session.token}`
      }
    })

    console.log(response)
    const json = await response.json()
    console.log(json)
  }

  render = () => {
    return (
      <div {...Dashboard.styles}>
        <div>
          <div>Maestro</div>
          <div>
            <div className='active'>Clusters</div>
            <div>Schedulers</div>
          </div>
        </div>
        <div>
          <div>Search</div>
          <div>Scheduler #1</div>
          <div>Scheduler #2</div>
        </div>
      </div>
    )
  }
}

Dashboard.styles = css({
  // Header
  '> div:nth-of-type(1)': {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',

    '@media (min-width: 600px) and (max-width: 1000px)': {
      flexDirection: 'row',
      padding: '20px 30px'
    },
    '@media(max-width: 600px)': {
      flexDirection: 'column'
    },

    // Maestro
    '> div:nth-of-type(1)': {
      fontWeight: '700',
      fontSize: '18px',

      '@media (min-width: 600px) and (max-width: 1000px)': {
      },

      '@media(max-width: 600px)': {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        width: '100%',
        height: '48px',
        paddingLeft: '16px',
        borderBottom: '1px #f4f3f3 solid'
      }
    },

    // Clusters & Schedulers
    '> div:nth-of-type(2)': {
      '@media (min-width: 600px) and (max-width: 1000px)': {
        display: 'inline-flex',
        marginLeft: 'auto',

        '& div': {
          padding: '6px 14px',
          borderRadius: '10px',
          border: '2px solid #dee3e7',
          color: '#757ab0',
          fontSize: '14px',

          '&.active': {
            borderColor: '#fed26c',
            color: '#fed26c'
          }
        },

        '& div + div': {
          marginLeft: '20px'
        }
      },

      '@media(max-width: 600px)': {
        display: 'flex',
        width: '100%',

        '& div': {
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          width: '50%',
          height: '48px',
          paddingLeft: '16px',
          borderBottom: '3px #f4f3f3 solid',

          '&.active': {
            borderColor: '#44abea'
          }
        }
      }
    }
  },

  '> div:nth-of-type(2)': {
    display: 'flex',
    width: '100%'
  }
})

export default connect(state => ({
  session: state.session
}))(Dashboard)
