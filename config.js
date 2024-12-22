require("./database/module")

//GLOBAL PAYMENT
global.storename = "FADARE"
global.dana = "8133729715"
global.qris = "-"


// GLOBAL SETTING
global.owner = "2348133729715"
global.namabot = "PATRON "
global.nomorbot = "2348133729715"
global.namaCreator = "PA"
global.linkyt = ""
global.autoJoin = false
global.antilink = false
global.versisc = '3.0'

// DELAY JPM
global.delayjpm = 5500



//GLOBAL THUMB

global.codeInvite = ""
global.imageurl = 'https://files.catbox.moe/vneik8.jpg'
global.thumb = 'https://files.catbox.moe/vneik8.jpg'
global.isLink = "https://whatsapp.com/channel/0029Val0s0rIt5rsIDPCoD2q"
global.packname = "patron"
global.author = "»P»»A»»T»»R»»O»»N»"
global.jumlah = "5"


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})