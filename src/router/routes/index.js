const main = require('./main')
const auth = require('./auth')
const app = require('./app')
const blog = require('./blog')

module.exports = [
    ...main,
    ...auth,
    ...app,
    ...blog
]
