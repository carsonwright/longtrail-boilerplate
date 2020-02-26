import axios from 'axios'
import {Session} from '../collections'
const api = {}

api.client = ()=>{
    const headers = {}
    if(Session.value.token) headers['x-token'] = Session.value.token
    const api = axios.create({
        baseURL: 'http://localhost:3001',
        headers
    })


    return api
}

api.accounts = {
    create: (params)=>(
        api.client().post('/accounts', params)
    ),
    all: ()=>(
        api.client().get('/accounts')
    )
}
api.session = {
    signUp: (params)=>(
        api.client().post('/sessions', params)
    ),
    login: (params)=>(
        api.client().put('/sessions', params)
    )
}
api.others = {
    all: ()=>(
        api.client().get('/others')
    )
}
window.api = api
export default api