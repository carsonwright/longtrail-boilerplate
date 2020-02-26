const {Account} = require('../../models')
const {Controller, logger} = require('../../../lib');
const Base = require('./Base')

class OtherController extends Base {
    constructor(...args){
        super(...args);
        // this.strongParams = strongParams
    }

    async index(){
        this.render({
            json: {
                authenticatedValue: true
            }
        })
    }
}

module.exports = OtherController