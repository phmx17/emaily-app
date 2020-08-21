const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = app => {
    app.use(
        ['/api', '/auth/google'],
        createProxyMiddleware({
            target: "http://localhost:5000"
        })
    );
};
// don't add any of this to the package.json file as in the videos; it'll break everything
