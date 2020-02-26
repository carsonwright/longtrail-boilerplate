const http = require('http');
const config = require('./config')
const routes = require('./config/routes')
const querystring = require('querystring');

const server = http.createServer(async(req, res)=>{
    let chunks;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'x-token, Origin, X-Requested-With, Content-Type, Accept, x-organization-id');
    res.send = (data)=>{
        res.end(data ? JSON.stringify(data, null, 4) : '');
    }
    if(req.method.toLocaleLowerCase() === 'options'){
        res.end()
    }else{
        req.on('data', (chunk)=>{
            chunks = chunks || "";
            chunks += chunk;
        });

        req.on('end', async()=>{
            try{
                const ct = req.headers["content-type"]
            
                if((ct || '').includes('application/x-www-form-urlencoded')){
                    req.body = querystring.parse(chunks)
                } else {
                    try{
                        req.body = JSON.parse(chunks || '{}');
                    }catch(error){
                        console.log("COULD NOT PARSE JSON", error)
                    }
                }
            }catch(error){
                logger.error({key: ['ROUTER', 'BODY', 'JSON'], message: error});
            }

            const path = req.url.split('?')[0]

            const params = querystring.parse(
                req.url.split('?')[1]
            )


            const parameter = (params)=>{
                if(JSON.stringify(params).length > 600){
                    params = Object.keys(params).reduce((acc, key)=>{
                        acc[key] = '...'
                        return acc
                    }, {})
                }

                if(params instanceof Array){
                    params = params.map((key)=>
                        typeof params[key] == 'object' ? parameter(params[key]) : params[key]
                    )
                }else if(typeof params === 'object'){
                    params = Object.keys(params).reduce((acc, key)=>{
                        if(typeof params[key] === 'string'){
                            acc[key] = key.toLocaleLowerCase().includes('password') ?  '****************' :  params[key]
                        }else if(params[key] instanceof Object){
                            acc[key] = parameter(params[key])
                        }
                        return acc;
                    }, {})
                }

                return params
            }

            console.log('==================================')
            console.log('Request Type:   ', req.method.toLowerCase(), path)
            console.log('params:         ', JSON.stringify(parameter(params)))

            routes.lookup(req, res)
        })
    }
})

server.listen(config.server.port);