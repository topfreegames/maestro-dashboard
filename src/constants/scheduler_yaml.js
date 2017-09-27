export default [
  {
    name: 'name',
    type: 'simple'
  },
  {
    name: 'game',
    type: 'simple'
  },
  {
    name: 'image',
    type: 'simple'
  },
  {
    name: 'shutdownTimeout',
    type: 'simple',
    varType: 'integer'
  },
  {
    name: 'occupiedTimeout',
    type: 'simple',
    varType: 'integer'
  },
  {
    name: 'limits',
    type: 'section',
    children: [
      {
        name: 'memory',
        type: 'simple'
      },
      {
        name: 'cpu',
        type: 'simple'
      }
    ]
  },
  {
    name: 'autoscaling',
    type: 'section',
    children: [
      {
        name: 'min',
        type: 'simple',
        varType: 'integer'
      },
      {
        name: 'up',
        type: 'section',
        children: [
          {
            name: 'delta',
            type: 'simple',
            varType: 'integer'
          },
          {
            name: 'trigger',
            type: 'section',
            children: [
              {
                name: 'usage',
                type: 'simple',
                varType: 'integer'
              },
              {
                name: 'time',
                type: 'simple',
                varType: 'integer'
              }
            ]
          },
          {
            name: 'cooldown',
            type: 'simple',
            varType: 'integer'
          }
        ]
      },
      {
        name: 'down',
        type: 'section',
        children: [
          {
            name: 'delta',
            type: 'simple',
            varType: 'integer'
          },
          {
            name: 'trigger',
            type: 'section',
            children: [
              {
                name: 'usage',
                type: 'simple',
                varType: 'integer'
              },
              {
                name: 'time',
                type: 'simple',
                varType: 'integer'
              }
            ]
          },
          {
            name: 'cooldown',
            type: 'simple',
            varType: 'integer'
          }
        ]
      }
    ]
  }
]
