//image from server
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/productImage',
    createProxyMiddleware({
      target: 'https://shoppingcart-mernstackapp.herokuapp.com/',
      changeOrigin: true,
    })
  );
};