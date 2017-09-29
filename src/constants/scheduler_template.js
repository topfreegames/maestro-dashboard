export default {
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
