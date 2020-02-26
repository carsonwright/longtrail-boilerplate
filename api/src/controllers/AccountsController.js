const {Account} = require('../models')
const {Controller} = require('../../lib');

class SessionsController extends Controller {
    constructor(...args){
        super(...args);
        // this.strongParams = strongParams
    }

    async index(){
        const accounts = await Account.all()
        this.render({
            json: accounts
        })
    }
    async create(){
        const account = await Account.create(this.params)

        this.render({
            json: account
        })
    }
}

module.exports = SessionsController