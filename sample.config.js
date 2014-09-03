module.exports = function () {
  return {
    development: {
      serviceUrl: 'http://localhost:3000'
    },
    production: {
      serviceUrl: 'http://api.js.uy',
      deploy: {
        host: 'my.prodserver.com',
        user: 'auser',
        pass: 'apassword',
        port: '22',
        remotePath: '/home/auser/public_html'
      }
    }
  };
};