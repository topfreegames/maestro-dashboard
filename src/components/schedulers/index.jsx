import React from 'react'
import { css } from 'glamor'
import Scheduler from 'containers/schedulers/scheduler'
import { Spinner, AddButton, AutoComplete } from 'components/common'
import styles from 'constants/styles'
import { navigate } from 'actions/common'
import { randomString } from 'helpers/common'

const newScheduler = event => {
  event.preventDefault()
  navigate('/schedulers/new')
}

const Schedulers = ({
  filter,
  gameFilter,
  gameFilterOptions,
  handleGameFilterChange,
  schedulers,
  fetching
}) => (
  <div {...Schedulers.styles}>
    <div {...filterStyles}>
      <AutoComplete
        options={gameFilterOptions}
        value={gameFilter}
        handleChange={handleGameFilterChange}
        placeholder={'Filter by game'}
      />
    </div>
    {filter !== '' &&
      <div className='results'>Results for <span>{filter}</span></div>}
    {(fetching && schedulers.length === 0) &&
      <Spinner r={0} g={0} b={0} />}
    {(!fetching || schedulers.length > 0) &&
      schedulers.map(s => <Scheduler key={`${s.name}${randomString(4)}`} {...s} />)}
    <AddButton handleClick={newScheduler} />
  </div>
)

const filterStyles = css({
  marginBottom: '16px'
})

Schedulers.styles = css({
  display: 'flex',
  boxSizing: 'border-box',
  flexDirection: 'column',
  padding: '16px',

  [`@media(min-width: ${styles.sizes.minLarge})`]: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '15px'
  },

  '> .results': {
    fontSize: styles.fontSizes['3'],
    color: styles.colors.gray_75,
    marginBottom: '16px',

    '> span': {
      color: styles.colors.brandPrimary
    }
  }
})

export default Schedulers
