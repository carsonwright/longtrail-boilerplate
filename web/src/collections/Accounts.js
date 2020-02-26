import {Collection} from '../lib'
import api from '../apiClient'


class Accounts extends Collection {
    static get collectionName(){
        return 'accounts'
    }
    static create(params){
        return api.accounts.create(params).then(({data} = {})=>{
            this.set([
                ...this.value,
                data
            ])
        })
    }
}

export default Accounts