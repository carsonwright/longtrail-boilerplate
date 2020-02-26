const {Migration} = require('../../lib/index')

class createTokens extends Migration {
    async up () {
        return await this.createTable('tokens', (t)=>{
            t.uuid('accountID')
            t.string('key')
            t.string('type')
        })
    }
    async down () {
        return await this.dropTable('tokens')
    }
}

module.exports = createTokens.migration()