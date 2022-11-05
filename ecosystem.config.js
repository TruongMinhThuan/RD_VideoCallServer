module.exports = {
  apps: [
    {
      script: 'ts-node', // or locally "./node_modules/.bin/_ts-node"
      args: 'src/index.ts',
      name: 'videocall_server'
    },
  ],
};
