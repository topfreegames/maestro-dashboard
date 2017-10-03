import { validations } from 'helpers/templates'

export default {
  _type: 'compose',
  name: {
    _type: 'string',
    _validations: [
      validations.required
    ]
  },
  game: {
    _type: 'string',
    _validations: [
      validations.required
    ]
  },
  image: {
    _type: 'string',
    _validations: [
      validations.required
    ]
  },
  affinity: {
    _type: 'string'
  },
  ports: {
    _type: 'array',
    _format: {
      _type: 'compose',
      containerPort: {
        _type: 'integer',
        _validations: [
          validations.required
        ]
      },
      protocol: {
        _type: 'string',
        _validations: [
          validations.required
        ]
      },
      name: {
        _type: 'string',
        _validations: [
          validations.required
        ]
      }
    }
  },
  shutdownTimeout: {
    _type: 'integer',
    _label: 'shutdown timeout',
    _validations: [
      validations.required
    ]
  },
  occupiedTimeout: {
    _type: 'integer',
    _label: 'occupied timeout'
  },
  limits: {
    _type: 'compose',
    memory: {
      _type: 'string',
      _validations: [
        validations.required
      ]
    },
    cpu: {
      _type: 'string',
      _validations: [
        validations.required
      ]
    }
  },
  autoscaling: {
    _type: 'compose',
    min: {
      _type: 'integer',
      _validations: [
        validations.required
      ]
    },
    up: {
      _type: 'compose',
      delta: {
        _type: 'integer',
        _validations: [
          validations.required
        ]
      },
      trigger: {
        _type: 'compose',
        usage: {
          _type: 'integer',
          _validations: [
            validations.required
          ]
        },
        time: {
          _type: 'integer',
          _validations: [
            validations.required
          ]
        },
        threshold: {
          _type: 'integer',
          _validations: [
            validations.required
          ]
        }
      },
      cooldown: {
        _type: 'integer',
        _validations: [
          validations.required
        ]
      }
    },
    down: {
      _type: 'compose',
      delta: {
        _type: 'integer',
        _validations: [
          validations.required
        ]
      },
      trigger: {
        _type: 'compose',
        usage: {
          _type: 'integer',
          _validations: [
            validations.required
          ]
        },
        time: {
          _type: 'integer',
          _validations: [
            validations.required
          ]
        },
        threshold: {
          _type: 'integer',
          _validations: [
            validations.required
          ]
        }
      },
      cooldown: {
        _type: 'integer',
        _validations: [
          validations.required
        ]
      }
    }
  }
}
