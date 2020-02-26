const environments = require('./environments')
const env = process.env.NODE_ENV || 'development'
module.exports = environments[
    env
]({
    database: {
        client: 'pg',
        asyncStackTraces: true,
        // version: '7.2',
        connection: {
            database: 'gadgeteer_test'
        },
        migrations: {
            directory: './db/migrations'
        }
    },
    server: {},
    env
})