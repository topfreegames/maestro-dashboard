import React from 'react'

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

const makePath = (prefix, name) => `${prefix}${name}`

const getValue = (path, origin) =>
  path.split('.').reduce((acc, x) => acc[x], origin)

export const renderScheduler = (scheduler, handleChange) => {
  const renderSimple = ([name, data], prefix) => (
    <div key={makePath(prefix, name)}>
      <label htmlFor={name}>{name}</label>
      <input
        name={makePath(prefix, name)}
        type='text'
        value={getValue(makePath(prefix, name), scheduler)}
        onChange={handleChange}
      />
    </div>
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
    [name]: getValue(makePath(prefix, name), scheduler)
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
