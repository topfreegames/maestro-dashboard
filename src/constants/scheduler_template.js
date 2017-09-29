export default {
  _type: 'compose',
  name: {
    _type: 'string'
  },
  game: {
    _type: 'string'
  },
  image: {
    _type: 'string'
  },
  affinity: {
    _type: 'string',
    _optional: true
  },
  ports: {
    _type: 'array',
    _format: {
      _type: 'compose',
      containerPort: {
        _type: 'integer'
      },
      protocol: {
        _type: 'string'
      },
      name: {
        _type: 'string'
      }
    },
    _optional: true
  },
  shutdownTimeout: {
    _type: 'integer',
    _label: 'shutdown timeout'
  },
  occupiedTimeout: {
    _type: 'integer',
    _label: 'occupied timeout'
  },
  limits: {
    _type: 'compose',
    memory: {
      _type: 'string'
    },
    cpu: {
      _type: 'string'
    }
  },
  autoscaling: {
    _type: 'compose',
    min: {
      _type: 'integer'
    },
    up: {
      _type: 'compose',
      delta: {
        _type: 'integer'
      },
      trigger: {
        _type: 'compose',
        usage: {
          _type: 'integer'
        },
        time: {
          _type: 'integer'
        }
      },
      cooldown: {
        _type: 'integer'
      }
    },
    down: {
      _type: 'compose',
      delta: {
        _type: 'integer'
      },
      trigger: {
        _type: 'compose',
        usage: {
          _type: 'integer'
        },
        time: {
          _type: 'integer'
        }
      },
      cooldown: {
        _type: 'integer'
      }
    }
  }
}
