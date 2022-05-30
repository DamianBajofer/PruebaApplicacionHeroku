const {app} = require("electron")
const fs = require("fs")
const {Query} = require(`${app.getAppPath()}/modules/connection`)
app.on("ready", async () => {
	const sqlite = require("sqlite3").verbose()
	const DB = new sqlite.Database(`./localdb.db`, async (error) => {
		if(error){
			console.log(error)
			return false
		}
		const table = fs.readFileSync("src/sql/client_accounts.sql").toString()
		DB.run(table)
		DB.all("SELECT * FROM `client_accounts`", (error, data) => {
			if(data.length){
				data.forEach((value, key) => {
					console.log(value)
				})
			}
		})
	})
})