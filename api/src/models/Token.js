const bcrypt = require('bcrypt');
const {Model} = require('../../lib')
const crypto = require('crypto')

class Token extends Model {
    static get tableName(){
        return 'tokens'
    }

    static async create(options = {}){
        const randomBytes = await crypto.randomBytes(64)
        
        return await super.create({
            ...options,
            key: randomBytes.toString('hex')
        })
    }
    serialize(){
        return this.key
    }
    
}

module.exports = Token