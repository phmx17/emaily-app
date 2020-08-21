/* Credential logic */
if (process.env.NODE_ENV === 'production') {
    // prod mode
    module.exports = require('./prod')
} else {
    // dev mode
    module.exports = require('./dev')
} 