import { validations } from 'helpers/templates'

export default {
  _type: 'compose',
  minimum: {
    _type: 'integer',
    _validations: [
      validations.required
    ]
  },
  replicas: {
    _type: 'integer',
    _validations: [
      validations.required
    ]
  }
}
