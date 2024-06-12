import fetch from 'node-fetch'
import fg from 'api-dylux'


const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `Please send the link of a Facebook video\n\nEXAMPLE :\n*${usedPrefix + command}* https://www.facebook.com/`;
  }



 await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '⌛'  }}, { messageId: m.key.id })

  try {
    const result = await fg.fbdl(args[0]);
    const tex = `*TITLE :* ${result.title || ''}`

    const response = await fetch(result.videoUrl)
    const arrayBuffer = await response.arrayBuffer()
    const videoBuffer = Buffer.from(arrayBuffer)
    
    conn.sendFile(m.chat, videoBuffer, 'fb.mp4', tex, m)
  } catch (error) {
    console.log(error)
    m.reply('⚠️ An error occurred while processing the request. Please try again later.')
  }
}

handler.help = ['facebook <url>']
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(downloder|dl)?)$/i

export default handler
