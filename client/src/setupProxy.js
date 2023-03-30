const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://react-cha-server.fly.dev/',
      changeOrigin: true,
    })
  );
};