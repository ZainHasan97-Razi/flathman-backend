module.exports = {
  apps : [
  {
    name        : "laxstat",
    script      : "dist/main.js",
    instances  : "max",
    exec_mode  : "cluster",
    watch       : false,
    env: {
      NODE_OPTIONS: '-r newrelic',
    },
  }
  ]
}