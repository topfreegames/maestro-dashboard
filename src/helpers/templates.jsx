import React from 'react'
import { Button, TextInput } from 'components/common'

export const validations = {
  required: {
    msg: 'Required',
    func: value => value !== ''
  }
}

const getField = (template, path) =>
  path.split('.').reduce((acc, x) => {
    return acc._format || acc[x]
  }, template)

const makePath = (prefix, name) => `${prefix}${name}`

const getValue = (path, origin) =>
  path.split('.').reduce((acc, x) => acc[x], origin)

export const render = (template, object, errors, handleChange, handleAdd, handleRemove) => {
  const makeLabel = (prefix, name) => {
    const f = getField(template, makePath(prefix, name))
    const suffix = f.optional ? ' (OPTIONAL)' : ''
    return (f._label ? f._label : name) + suffix
  }

  const renderSimple = ([name, _], prefix) => (
    <TextInput
      key={makePath(prefix, name)}
      id={makePath(prefix, name)}
      label={makeLabel(prefix, name)}
      value={getValue(makePath(prefix, name), object)}
      handleChange={handleChange}
      error={errors[makePath(prefix, name)]}
    />
  )

  const renderArray = ([name, { _format }], prefix) => {
    const arrayPath = makePath(prefix, name)
    const arr = getValue(arrayPath, object) || []
    const len = arr.length

    return (
      <div className='section' key={makePath(prefix, name)}>
        <div>
          <label>{name}</label>
          <Button size='small' handleClick={e => handleAdd(e, `${arrayPath}.${len}`, parse(_format))}>Add</Button>
        </div>
        {arr.map((e, i) => {
          const newPrefix = `${arrayPath}.${i}.`

          return (
            <div key={newPrefix} className='section'>
              <Button
                size='small'
                variant='secondary'
                customStyles={{ display: 'inline-flex' }}
                handleClick={e => handleRemove(e, arrayPath, i)}
              >
                Remove
              </Button>
              {renderObject(_format, newPrefix)}
            </div>
          )
        })}
      </div>
    )
  }

  const renderCompose = ([name, children], prefix) => (
    <div className='section' key={makePath(prefix, name)}>
      <label>{name}</label>
      {renderObject(children, `${makePath(prefix, name)}.`)}
    </div>
  )

  const renderEntry = (e, prefix = '') => {
    switch (e[1]._type) {
      case 'compose':
        return renderCompose(e, prefix)
      case 'array':
        return renderArray(e, prefix)
      default:
        return renderSimple(e, prefix)
    }
  }

  const renderObject = (o, prefix = '') =>
    Object.entries(o)
      .filter(e => e[0][0] !== '_')
      .map(e => renderEntry(e, prefix))

  return object && renderObject(template)
}

export const parse = (template, object) => {
  const parseSimple = ([name, _], prefix) => ({
    [name]: (object && getValue(makePath(prefix, name), object)) || ''
  })

  const parseArray = ([name, _], prefix) => ({
    [name]: (object && getValue(makePath(prefix, name), object)) || []
  })

  const parseCompose = ([name, children], prefix) => ({
    [name]: parseObject(children, `${makePath(prefix, name)}.`)
  })

  const parseEntry = (e, prefix) => {
    switch (e[1]._type) {
      case 'compose':
        return parseCompose(e, prefix)
      case 'array':
        return parseArray(e, prefix)
      default:
        return parseSimple(e, prefix)
    }
  }

  const parseObject = (o, prefix = '') =>
    Object.entries(o)
      .filter(e => e[0][0] !== '_')
      .reduce((acc, e) => ({
        ...acc,
        ...parseEntry(e, prefix)
      }), {})

  return parseObject(template)
}

export const setInPath = (template, object, path, value) =>
  path.split('.').reduce((acc, x, i, arr) => {
    if (i === arr.length - 1) {
      const field = getField(template, path)
      acc[x] = field._type === 'integer'
        ? (parseInt(value) || '')
        : value

      return object
    } else {
      return acc[x]
    }
  }, object)

export const removeInPath = (object, path, index) =>
  path.split('.').reduce((acc, x, i, arr) => {
    if (i === arr.length - 1) {
      acc[x] = acc[x].filter((e, i) => i !== parseInt(index))
      return object
    } else {
      return acc[x]
    }
  }, object)

export const validate = (object, template) => {
  const doValidations = (validations, prefix, name) => {
    if (!validations) return {}
    const value = getValue(makePath(prefix, name), object) || ''

    const errors = validations.reduce((acc, v) => {
      const pass = v.func(value)
      return !pass ? [...acc, v] : [...acc]
    }, [])

    return errors.length > 0 ? { [makePath(prefix, name)]: errors } : {}
  }

  const validateSimple = ([name, _], prefix) => {
    const validations = getField(template, makePath(prefix, name))._validations
    return doValidations(validations, prefix, name)
  }

  const validateArray = ([name, { _format }], prefix) => {
    const array = getValue(makePath(prefix, name), object) || []
    return array.reduce((acc, _, i) => ({
      ...acc,
      ...validateObject(_format, `${makePath(prefix, name)}.${i}.`)
    }), {})
  }

  const validateCompose = ([name, children], prefix) =>
    validateObject(children, `${makePath(prefix, name)}.`)

  const validateEntry = (e, prefix) => {
    switch (e[1]._type) {
      case 'compose':
        return validateCompose(e, prefix)
      case 'array':
        return validateArray(e, prefix)
      default:
        return validateSimple(e, prefix)
    }
  }

  const validateObject = (object, prefix) =>
    Object.entries(object)
      .filter(e => e[0][0] !== '_')
      .reduce((acc, e) => ({
        ...acc,
        ...validateEntry(e, prefix)
      }), {})

  return validateObject(template, '')
}
