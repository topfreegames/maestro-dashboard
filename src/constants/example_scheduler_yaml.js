export default `name: pong-free-for-all     # this will be the name of the kubernetes namespace (it must be unique)
game: pong                  # several configs can refer to the same game
image: pong/pong:v123
affinity: node-affinity     # optional field: if set, rooms will be allocated preferentially to nodes with label "node-affinity": "true"
toleration: node-toleration # optional field: if set, rooms will also be allocated in nodes with this taint
occupiedTimeout: match-time # how much time a match has. If room stays with occupied status for longer than occupiedTimeout seconds, the room is deleted
ports:
  - containerPort: 5050     # port exposed in the container
    protocol: UDP           # supported protocols are TCP and UDP
    name: gamebinary        # name identifying the port (must be unique for a config)
  - containerPort: 8888
    protocol: TCP
    name: websocket
limits:                     # these will be the resources limits applied to the pods created in kubernetes
  memory: "128Mi"           # they are used to decide how many rooms can run in each node
  cpu: "1"                  # more info: https://kubernetes.io/docs/tasks/configure-pod-container/assign-cpu-ram-container/
shutdownTimeout: 180        # duration in seconds the pod needs to terminate gracefully
autoscaling:
  min: 100                  # minimum amount of GRUs
  up:
    delta: 10               # how many GRUs will be created every time the scaling policy is triggered
    trigger:
      usage: 70             # minimum usage (percentage) that can trigger the scaling policy
      time: 600             # duration in seconds to wait before scaling policy takes place
      threshold: 80         # percentage of the points that are above 'usage' needed to trigger scale up
    cooldown: 300           # duration in seconds to wait before consecutive scaling
  down:
    delta: 2                # how many GRUs will be terminated every time the scaling policy is triggered
    trigger:
      usage: 50             # maximum usage (percentage) the can trigger the scaling policy
      time: 900
      threshold: 80        # percentage of the points that are above 'usage' needed to trigger scale down
    cooldown: 300
env:                        # environment variable to be passed on to the container
  - name: EXAMPLE_ENV_VAR
    value: examplevalue
  - name: ANOTHER_ENV_VAR
    value: anothervalue
cmd:                        # if the image can run with different arguments you can specify a cmd
  - "./room-binary"
  - "-serverType"
  - "6a8e136b-2dc1-417e-bbe8-0f0a2d2df431"
forwarders:                # optional field: if set events will be forwarded for the grpc matchmaking plugin
  grpc:
    matchmaking:
      enabled: true
      metadata:            # the forwarder metadata is forwarded in scheduler events (create and update)
        matchmakingScript: default
        metadata:
          authTimeout: 10000
        minimumNumberOfPlayers: 1
        numberOfTeams: 1
        playersPerTeam: 6
        roomType: "10"`
