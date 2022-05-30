const {app, screen} = require("electron")
const {Query} = require(`${app.getAppPath()}/modules/connection`)
app.on("ready", async () => {
	const data = await Query("SELECT `name` FROM `acore_world`.`item_template` ORDER BY(`entry`) DESC LIMIT 10")
	data.forEach((value, key) => {
		console.log(key, value.name)
	})
})