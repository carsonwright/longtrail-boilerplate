const {
    SessionsController,
    authenticated
} = require('../src/controllers')

const {router} = require('../lib')


router.routes((r)=>{
    r.post('/sessions', SessionsController, 'create')
    r.put('/sessions', SessionsController, 'update')
    r.get('/others', authenticated.OtherController, 'index')
    r.get('*', SessionsController, 'notFound')
})

module.exports = router