import {Collection} from '../lib'
import api from '../apiClient'

class Session extends Collection {
    static get collectionName(){
        return 'session'
    }
    static signup(params){
        api.session.signUp(
            params
        ).then(({data}={})=>{
            this.set(data)
        })
    }
    static login(params){
        // return api.accounts.create(params).then(({data} = {})=>{
        //     this.set()
        // })
        api.session.login(
            params
        ).then(({data}={})=>{
            this.set(data)
        })
    }
    static get value(){
        return super.value || {}
    }
}

export default Session