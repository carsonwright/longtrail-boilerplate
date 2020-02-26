const {Migration} = require('../../lib/index')

class createAccounts extends Migration {
    async up () {
        return await this.createTable('accounts', (t)=>{
            t.string('firstName')
            t.string('lastName')
            t.string('mobileNumber')
            t.string('email')
            t.string('encryptedPassword')
        })
    }
    async down () {
        return await this.dropTable('accounts')
    }
}

module.exports = createAccounts.migration()