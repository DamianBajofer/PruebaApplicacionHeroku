const {app} = require("electron")
const mysql = require("promise-mysql")
let connection = null

ConnectStart = async () => {
    connection = await mysql.createConnection({
        host: "localapps.servegame.com",
        port: "3306",
        user: "root",
        password: "root",
        multipleStatements: true
    })
    return connection
}

GetConnection = async () => {
    if(!connection){
        return await ConnectStart()
    }
	return connection
}

Query = async (SQL) => {
    try{
        const connection = await GetConnection()
        const result = await connection.query(SQL)
        if(app.Dev){
            console.log(app.Dev ? SQL : "") // Console debug.
        }
        return result
    }catch(e){
        dialog.showMessageBox({
            type: "error",
            title: "Error de conexion a MySQL",
            message: e.code.toString(),
            detail: e.message.toString()
        })
        return false
    }
}

module.exports = { Query }