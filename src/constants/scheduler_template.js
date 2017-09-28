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
  affinity: {
    type: 'string',
    optional: true
  },
  ports: {
    type: 'array',
    format: {
      containerPort: {
        type: 'integer'
      },
      protocol: {
        type: 'string'
      },
      name: {
        type: 'string'
      }
    },
    optional: true
  },
  shutdownTimeout: {
    type: 'integer',
    label: 'shutdown timeout'
  },
  occupiedTimeout: {
    type: 'integer',
    label: 'occupied timeout'
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

export const getField = path =>
  path.split('.').reduce((acc, x) => {
    return acc.format || acc[x].children || acc[x]
  }, template)

const makePath = (prefix, name) => `${prefix}${name}`

const getValue = (path, origin) =>
  path.split('.').reduce((acc, x) => acc[x], origin)

export const renderScheduler = (scheduler, handleChange, handleAdd) => {
  const makeLabel = (prefix, name) => {
    const f = getField(makePath(prefix, name))
    const suffix = f.optional ? ' (OPTIONAL)' : ''
    return (f.label ? f.label : name) + suffix
  }

  const renderSimple = ([name, _], prefix) => (
    <TextInput
      key={makePath(prefix, name)}
      id={makePath(prefix, name)}
      label={makeLabel(prefix, name)}
      value={getValue(makePath(prefix, name), scheduler)}
      handleChange={handleChange}
    />
  )

  const renderArray = ([name, { format }], prefix) => {
    const arrayPath = makePath(prefix, name)
    const arr = getValue(arrayPath, scheduler)
    const len = arr.length

    return (
      <div className='section' key={makePath(prefix, name)}>
        <div><label>{name}</label><button onClick={e => handleAdd(e, `${arrayPath}.${len}`, parseFormat(format))}>+ add</button></div>
        {arr.map((e, i) => {
          const newPrefix = `${arrayPath}.${i}.`

          return (
            <div key={newPrefix} className='section'>
              {renderObject(format, newPrefix)}
            </div>
          )
        })}
      </div>
    )
  }

  const renderCompose = ([name, { children }], prefix) => (
    <div className='section' key={makePath(prefix, name)}>
      <label>{name}</label>
      {renderObject(children, `${makePath(prefix, name)}.`)}
    </div>
  )

  const renderEntry = (e, prefix = '') => {
    if (e[1].children) return renderCompose(e, prefix)
    else if (e[1].type === 'array') return renderArray(e, prefix)
    else return renderSimple(e, prefix)
  }

  const renderObject = (o, prefix = '') =>
    Object.entries(o).map(e => renderEntry(e, prefix))

  return scheduler && renderObject(template)
}

const parseFormat = format => {
  const parseSimple = ([name, _]) => ({
    [name]: ''
  })

  const parseCompose = ([name, { children }]) => ({
    [name]: parseObject(children)
  })

  const parseEntry = e =>
    e[1].children ? parseCompose(e) : parseSimple(e)

  const parseObject = o =>
    Object.entries(o).reduce((acc, e) => ({
      ...acc,
      ...parseEntry(e)
    }), {})

  return parseObject(format)
}

export const parseScheduler = scheduler => {
  const parseSimple = ([name, _], prefix) => ({
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
        const field = getField(path)
        acc[x] = field.type === 'integer'
          ? parseInt(value)
          : value
      }

      return scheduler
    } else {
      return acc[x]
    }
  }, scheduler)
