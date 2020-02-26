const longtrail = require('longtrail')
const config = require('../config')
const app = longtrail.init({
  database: {
    client: 'pg',
    asyncStackTraces: true,
    // version: '7.2',
    connection: {
        database: 'gadgeteer_test'
    },
    migrations: {
      directory: '../db/migrations'
    }
  },
  ...config,
  processors: {
      delay: 30000
  }
})

class BaseController extends app.lib.Controller{
    reject(){
        this.render({
            nothing: true,
            status: 400
        })
    }
}
app.lib.Controller = BaseController
module.exports = app.lib