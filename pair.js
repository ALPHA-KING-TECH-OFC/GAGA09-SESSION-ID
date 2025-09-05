
const { giftedid } = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const { Storage, File } = require("megajs");

const {
    default: Gifted_Tech,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("@whiskeysockets/baileys");

function randomMegaId(length = 6, numberLength = 4) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const number = Math.floor(Math.random() * Math.pow(10, numberLength));
    return `${result}${number}`;
}

async function uploadCredsToMega(credsPath) {
    try {
        const storage = await new Storage({
            email: 'techobed4@gmail.com',
            password: 'Trippleo1802obed'
        }).ready;
        console.log('Mega storage initialized.');
        if (!fs.existsSync(credsPath)) {
            throw new Error(`File not found: ${credsPath}`);
        }
        const fileSize = fs.statSync(credsPath).size;
        const uploadResult = await storage.upload({
            name: `${randomMegaId()}.json`,
            size: fileSize
        }, fs.createReadStream(credsPath)).complete;
        console.log('Session successfully uploaded to Mega.');
        const fileNode = storage.files[uploadResult.nodeId];
        const megaUrl = await fileNode.link();
        console.log(`Session Url: ${megaUrl}`);
        return megaUrl;
    } catch (error) {
        console.error('Error uploading to Mega:', error);
        throw error;
    }
}

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = giftedid();
    let num = req.query.number;

    async function GIFTED_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            let Gifted = Gifted_Tech({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: Browsers.macOS("Safari")
            });

            if (!Gifted.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await Gifted.requestPairingCode(num);
                console.log(`Your Code: ${code}`);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            Gifted.ev.on('creds.update', saveCreds);

            Gifted.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection == "open") {
                    await delay(50000);
                    const filePath = __dirname + `/temp/${id}/creds.json`;
                    if (!fs.existsSync(filePath)) {
                        console.error("File not found:", filePath);
                        return;
                    }

                    const megaUrl = await uploadCredsToMega(filePath);
                    const sid = megaUrl.includes("https://mega.nz/file/")
                        ? 'gaga-md~' + megaUrl.split("https://mega.nz/file/")[1]
                        : 'Error: Invalid URL';

                    console.log(`Session ID: ${sid}`);

                    Gifted.groupAcceptInvite("Ik0YpP0dM8jHVjScf1Ay5S");

                    const sidMsg = await Gifted.sendMessage(
                        Gifted.user.id,
                        {
                            text: sid,
                            contextInfo: {
                                mentionedJid: [Gifted.user.id],
                                forwardingScore: 999,
                                isForwarded: true,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: '120363420705728710@newsletter',
                                    newsletterName: 'THIS IS THE SESSION ID',
                                    serverMessageId: 143
                                }
                            }
                        },
                        {
                            disappearingMessagesInChat: true,
                            ephemeralExpiration: 86400
                        }
                    );

                    const GIFTED_TEXT = `
╭─═━⌬━═─⊹⊱✦⊰⊹─═━⌬━═─ 
╎   『 𝐒𝐄𝐒𝐒𝐈𝐎𝐍 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 』   
╎  ✦ 🅃🅁🄰🅇🅇09
╎  ✦  🅻︎🅸︎🅻︎ 🅶︎🅰︎🅶︎🅰︎
╰╴╴╴╴

▌   『 🔐 𝐒𝐄𝐋𝐄𝐂𝐓𝐄𝐃 𝐒𝐄𝐒𝐒𝐈𝐎𝐍 』   
▌  • Session ID:  
▌  ⛔ [ Please set your SESSION_ID ] 

╔═
╟   『 𝐂𝐎𝐍𝐓𝐀𝐂𝐓 & 𝐒𝐔𝐏𝐏𝐎𝐑𝐓 』  
╟  🎥 𝐘𝐨𝐮𝐓𝐮𝐛𝐞: +263 78 007 8177
╟  👑 𝐎𝐰𝐧𝐞𝐫: +263 78 007 8177
╟  💻 𝐑𝐞𝐩𝐨: https://github.com/LGT09/gaga09-xmd-wa-bot
╟  📢 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥:https://whatsapp.com/channel/0029Vb6huGcJJhzUGbPbkN3W
╰  
✦⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅✦  
   𝐄𝐍𝐉𝐎𝐘 
✦⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅⋆⋅✦  
______________________________
★彡[ᴅᴏɴ'ᴛ ғᴏʀɢᴇᴛ ᴛᴏ sᴛᴀʀ ᴛʜᴇ ʀᴇᴘᴏ!]彡★

> github.com/ridz-coder01/BAYMAX-MD 
🌹 𝗦𝗽𝗲𝗰𝗶𝗮𝗹 𝗔𝗰𝗸𝗻𝗼𝘄𝗹𝗲𝗱𝗴𝗲𝗺𝗲𝗻𝘁: 𝗠𝗬 𝗧𝗘𝗔𝗠 🌹  

━━━━━━━━━━━━━━━━━━━`;

                    await Gifted.sendMessage(
                        Gifted.user.id,
                        {
                            text: GIFTED_TEXT,
                            contextInfo: {
                                mentionedJid: [Gifted.user.id],
                                forwardingScore: 999,
                                isForwarded: true,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: '120363420705728710@newsletter',
                                    newsletterName: 'JOIN MY CHANNEL FOR UPDATES👇',
                                    serverMessageId: 143
                                }
                            }
                        },
                        {
                            quoted: sidMsg,
                            disappearingMessagesInChat: true,
                            ephemeralExpiration: 86400
                        }
                    );

                    await delay(100);
                    await Gifted.ws.close();
                    return await removeFile('./temp/' + id);
                } else if (
                    connection === "close" &&
                    lastDisconnect &&
                    lastDisconnect.error &&
                    lastDisconnect.error.output.statusCode != 401
                ) {
                    await delay(10000);
                    GIFTED_PAIR_CODE();
                }
            });
        } catch (err) {
            console.error("Service Has Been Restarted:", err);
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "Service is Currently Unavailable" });
            }
        }
    }

    return await GIFTED_PAIR_CODE();
});

module.exports = router;
