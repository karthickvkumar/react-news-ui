const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware("/news", {
      target: "https://api.aylien.com",
      headers: {
        'Content-Type': 'application/json',
        'X-AYLIEN-NewsAPI-Application-ID': 'fa70e48f',
        'X-AYLIEN-NewsAPI-Application-Key': '1c9428f422bf76d6b86e05f2eaa8c97e',
      },
      secure: false,
      changeOrigin: true
    })
  );
};