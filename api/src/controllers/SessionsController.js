const {Account} = require('../models')
const {Controller, logger} = require('../../lib');

class SessionsController extends Controller {
    constructor(...args){
        super(...args);
        // this.strongParams = strongParams
    }

    async create(){
        const account = await Account.create(this.params)

        const token = await account.tokens.create({})
        this.render({
            json: {
                account: account.serialize(),
                token: token.serialize()
            }
        })
    }

    async update(){
        const mobileNumber = this.params.mobileNumber
        const account = await Account.findBy({
            mobileNumber
        })
        
        const token = await account.authenticate(this.params.password)
        
        if(token){
            this.render({
                json: {
                    account: account.serialize(),
                    token: token.serialize()
                }
            })
        }
    }

    async destroy(){
        const token = await Tokens.findBy({
            key: this.headers['x-token']
        })
        
        if(await token.destroy()){
            this.render({
                nothing: true 
            })
        }
    }
    async notFound(){
        this.render({
            nothing: true,
            status: 404
        })
    }
}

module.exports = SessionsController