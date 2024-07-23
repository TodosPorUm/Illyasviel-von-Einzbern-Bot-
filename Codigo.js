 const Discord = require('discord.js');
const ytdl = require('ytdl-core');

const bot = new Discord.Client();

const prefix = '!'; // Prefixo para comandos do bot

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async (msg) => {
    if (msg.author.bot) return; // Ignora mensagens de outros bots

    if (msg.content.startsWith(prefix)) {
        const args = msg.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === 'downloadplaylist') {
            if (!args[0]) {
                return msg.reply('Por favor, forneça um link válido para a playlist do YouTube!');
            }

            const playlistUrl = args[0];

            try {
                // Baixa informações da playlist
                const playlistInfo = await ytdl.getPlaylistInfo(playlistUrl);

                // Itera sobre os vídeos da playlist
                for (let video of playlistInfo.videos) {
                    // Baixa apenas o áudio (melhor eficiência para músicas)
                    const audioStream = ytdl(video.url, { filter: 'audioonly' });

                    // Aqui você pode implementar o que deseja fazer com o áudio
                    // Por exemplo, salvar em um servidor, enviar para o usuário, etc.
                    // Neste exemplo, apenas exibimos o título do vídeo
                    console.log(`Baixando: ${video.title}`);
                }

                msg.reply(`Playlist do YouTube baixada com sucesso!`);

            } catch (error) {
                console.error('Erro ao baixar a playlist:', error);
                msg.reply('Ocorreu um erro ao tentar baixar a playlist do YouTube.');
            }
        }
    }
});

// Coloque seu token do bot Discord aqui
const token = 'SEU_TOKEN_AQUI';

bot.login(token);
