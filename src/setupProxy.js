const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/keyword_test',
        createProxyMiddleware({
            target: 'http://localhost:9200',
            changeOrigin: true,
        })
    );
};