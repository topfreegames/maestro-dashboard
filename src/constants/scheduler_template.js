import React from 'react'
import { TextInput } from 'components/common'

export const template = {
  name: {
    type: 'string'
  },
  game: {
    type: 'string'
  },
  image: {
    type: 'string'
  },
  shutdownTimeout: {
    type: 'integer'
  },
  occupiedTimeout: {
    type: 'integer'
  },
  limits: {
    children: {
      memory: {
        type: 'string'
      },
      cpu: {
        type: 'string'
      }
    }
  },
  autoscaling: {
    children: {
      min: {
        type: 'integer'
      },
      up: {
        children: {
          delta: {
            type: 'integer'
          },
          trigger: {
            children: {
              usage: {
                type: 'integer'
              },
              time: {
                type: 'integer'
              }
            }
          },
          cooldown: {
            type: 'integer'
          }
        }
      },
      down: {
        children: {
          delta: {
            type: 'integer'
          },
          trigger: {
            children: {
              usage: {
                type: 'integer'
              },
              time: {
                type: 'integer'
              }
            }
          },
          cooldown: {
            type: 'integer'
          }
        }
      }
    }
  }
}

export const getType = path =>
  path.split('.').reduce((acc, x) => {
    return acc[x].children || acc[x].type
  }, template)

const makePath = (prefix, name) => `${prefix}${name}`

const getValue = (path, origin) =>
  path.split('.').reduce((acc, x) => acc[x], origin)

export const renderScheduler = (scheduler, handleChange) => {
  const renderSimple = ([name, data], prefix) => (
    <TextInput
      key={makePath(prefix, name)}
      id={makePath(prefix, name)}
      label={name}
      value={getValue(makePath(prefix, name), scheduler)}
      onChange={handleChange}
    />
  )

  const renderCompose = ([name, { children }], prefix) => (
    <div className='section' key={makePath(prefix, name)}>
      <label>{name}</label>
      {renderObject(children, `${makePath(prefix, name)}.`)}
    </div>
  )

  const renderEntry = (e, prefix = '') =>
    e[1].children ? renderCompose(e, prefix) : renderSimple(e, prefix)

  const renderObject = (o, prefix = '') =>
    Object.entries(o).map(e => renderEntry(e, prefix))

  return scheduler && renderObject(template)
}

export const parseScheduler = scheduler => {
  const parseSimple = ([name, data], prefix) => ({
    [name]: (scheduler && getValue(makePath(prefix, name), scheduler)) || ''
  })

  const parseCompose = ([name, { children }], prefix) => ({
    [name]: parseObject(children, `${makePath(prefix, name)}.`)
  })

  const parseEntry = (e, prefix) =>
    e[1].children ? parseCompose(e, prefix) : parseSimple(e, prefix)

  const parseObject = (o, prefix = '') =>
    Object.entries(o).reduce((acc, e) => ({
      ...acc,
      ...parseEntry(e, prefix)
    }), {})

  return parseObject(template)
}

export const setInPath = (scheduler, path, value) =>
  path.split('.').reduce((acc, x, i, arr) => {
    if (i === arr.length - 1) {
      if (value === '') {
        acc[x] = ''
      } else {
        acc[x] = getType(path) === 'integer'
          ? parseInt(value)
          : value
        return scheduler
      }
    } else {
      return acc[x]
    }
  }, scheduler)
