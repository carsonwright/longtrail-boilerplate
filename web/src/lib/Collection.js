import { createStore } from "redux";


const store = createStore((state={}, {type, key, payload})=>{
    switch(type){
        case 'set':
            state = {
                ...state
            }
            state[key] = JSON.parse(
                JSON.stringify(payload)
            )

            return state
        default:
            return state
    }
});


class Collection {
    constructor(){
        store.dispatch({
            type: 'set',
            key: this.collectionName,
            payload: this.initialValue
        })
    }
    static get store(){
        return store
    }
    static set(payload){
        this.store.dispatch({
            type: 'set',
            key: this.collectionName,
            payload
        })
    }
    static get value(){
        return this.store.getState()[this.collectionName]
    }
};

window.store = store;

export {
    Collection,
    store
}
export default Collection