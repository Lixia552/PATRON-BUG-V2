require("./global")

const mess = {
   wait: "<!> `Wait for the process bro`",
   success: "<!> `Full Success Very good`",
   on: "*`[ On Feature ]` - Already Active*", 
   off: "*`[ Off Feature ]` - Already Off*",
   query: {
       text: "<!> `Where's the text bro?`",
       link: "<!> `Where is the link bro?`",
   },
   error: {
       fitur: "<!> `I apologize for the error feature, please chat with the bot developer so that it can be fixed immediately`",
   },
   only: {
       group: "<!> `This feature can only be accessed within the group",
       private: "<!> `This Feature Can Only Be Accessed In Private Chat`",
       owner: "<!> `Your not owner u nigga`",
       admin: "</> `THIS CAN ONLY BE ACCESSED BY ADMIN`",
       badmin: "<!> `*FAILED* make the bot an admin so it can use this`",
       premium: "<!> `Premium users only`",
   }
}

global.mess = mess

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})