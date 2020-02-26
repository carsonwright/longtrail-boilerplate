const bcrypt = require('bcrypt');
const {Model} = require('../../lib')

class Account extends Model {
    static get tableName(){
        return 'accounts'
    }

    static get salt (){        
        return bcrypt.genSaltSync(10);
    }

    static encryptPassword(password){
        return bcrypt.hashSync(password, this.salt);
    }
    static create(options){
        const encryptedPassword = this.encryptPassword(options.password)
        delete options.password

        return super.create({
            ...options,
            encryptedPassword
        })
    }
    update(options){
        if(options.password){
            const encryptedPassword = this.encryptPassword(options.password)
            delete options.password

            options.encryptedPassword = encryptedPassword
        }
        return super.update(options)
    }

    async authenticate(password){
        if(password){
            const encryptedPassword = await bcrypt.compare(password, this.encryptedPassword);
            if(encryptedPassword){
                return await this.tokens.create();
            }
        }
        return false;
    }
    get tokens(){
        return this.hasMany('Token')
    }

    static async findByToken(token){
        const [account] = await this.query().innerJoin('tokens', 'tokens.accountID', 'accounts.id').where({
            'tokens.key': token
        })
        return account
    }

    serialize(){
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            mobileNumber: this.mobileNumber
        }
    }
}

module.exports = Account