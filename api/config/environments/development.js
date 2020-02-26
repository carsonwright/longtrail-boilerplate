module.exports = (options)=>{
    options.server.port = 3001
    options.database.connection.database = 'longtrail'

    return options;
}