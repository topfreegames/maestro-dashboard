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
  toleration: {
    _type: 'string'
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
    _label: 'occupied timeout',
    _validations: [
      validations.required
    ]
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
      cooldown: {
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
      cooldown: {
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
      }
    }
  },
  env: {
    _type: 'array',
    _format: {
      _type: 'compose',
      name: {
        _type: 'string',
        _validations: [
          validations.required
        ]
      },
      value: {
        _type: 'string',
        _validations: [
          validations.required
        ]
      }
    }
  },
  cmd: {
    _type: 'array_of_simples',
    _format: {
      _type: 'string'
    }
  },
  forwarders: {
    _type: 'compose',
    grpc: {
      _type: 'compose',
      matchmaking: {
        _type: 'compose',
        enabled: {
          _type: 'string',
          _default: 'false'
        },
        metadata: {
          _type: 'compose',
          matchmakingScript: {
            _type: 'string',
            _label: 'Matchmaking Script',
            _default: 'default'
          },
          minimumNumberOfPlayers: {
            _type: 'integer',
            _label: 'Minimum Number of Players'
          },
          numberOfTeams: {
            _type: 'integer',
            _label: 'Number of Teams'
          },
          playersPerTeam: {
            _type: 'integer',
            _label: 'Players Per Team'
          },
          roomType: {
            _type: 'string',
            _label: 'Room Type'
          },
          metadata: {
            _type: 'compose',
            authTimeout: {
              _type: 'integer',
              _label: 'Auth Timeout'
            }
          }
        }
      }
    }
  }
}
