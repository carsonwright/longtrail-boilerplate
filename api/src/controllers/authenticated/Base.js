const {Account} = require('../../models')
const {Controller, logger} = require('../../../lib');

class BaseController extends Controller {
    constructor(...args){
        super(...args);
    }
    async before(){
        const token = this.headers['x-token']
        if(token){
            this.currentAccount = await Account.findByToken(token)
        }
        
        if(this.currentAccount){
            return true;
        }else{
            return false
        }
    }
}

module.exports = BaseController