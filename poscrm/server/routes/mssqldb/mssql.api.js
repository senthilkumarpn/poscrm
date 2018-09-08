const sql = require('mssql')
var config = require("../../../appSettings.config").mssql;

sql.connect(config).then(() => {
    return sql.query(`select * from ApplicationUsers`)
}).then(result => {
    console.dir(result)
}).catch(err => {
    // ... error checks
})
 
sql.on('error', err => {
    // ... error handler
})