const Discord = require('discord.js');
const config = require('./config.json');
const ytdl = require('ytdl-core');

const client = new Discord.Client();
const music = {};

client.on('ready', () => {
  console.log(`Connecté en tant que ${client.user.username}`);
});

client.on('message', (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  if (message.content.startsWith(config.prefix)) {
    const args = message.content.split(/ +/g);
    const command = args.shift().slice(config.prefix.length).toLowerCase();
    console.log(command);
    console.log(args);

    if (command === 'skip') {
      // askip oui
    }

    if (command === 'queue') {
      if (music.queue) {
        if (music.queue.length > 0) {
          message.channel.send(`Voici les musiques actuellement planifiées :\n\n${music.queue.map(song => `${song}\n`)}`);
        } else {
          message.channel.send('Aucune musique trouvée dans la queue');
        }
      } else {
        message.channel.send('Le bot n\'est actuellement pas en train de lire de la musique');
      }
    }

    if (command === 'play') {
      if (!message.member.voiceChannel && client.voiceConnections.size === 0) {
        message.reply('Il faut que vous soyez dans un channel vocal pour exécuter cette commande');
        return;
      } else if (args.length <= 0 || !args[0].startsWith('https://www.youtube.com/watch?v=')) {
        message.reply('Il faut donner le lien d\'une vidéo YouTube [https://www.youtube.com/watch?v=]');
        return;
      }

      const calledVoiceChannel = message.member.voiceChannel
        || client.voiceConnections.first().channel;
      const streamOptions = { seek: 0, volume: 0.1 }; // il faut que ces paramètres soient générals

      if (!music.voiceConnection) {
        calledVoiceChannel.join()
          .then((connection) => {
            music.voiceConnection = connection;
            music.queue = [];
            let stream = ytdl(args[0], { filter: 'audioonly' });
            let dispatcher = music.voiceConnection.playStream(stream, streamOptions);
            dispatcher.on('end', () => {
              message.channel.send(`Fin de la musique, vous avez ${music.queue.length} musique(s) dans la file d'attente`);
              if (music.queue.length > 0) {
                stream = ytdl(music.queue[0], { filter: 'audioonly' });
                music.queue.shift();
                dispatcher = music.voiceConnection.playStream(stream, streamOptions);
              } else {
                calledVoiceChannel.leave();
                delete music.voiceConnection;
                delete music.queue;
              }
            });
            dispatcher.on('error', (e) => { console.log(e); message.channel.send('Une erreur s\'est produite'); });
          });
      } else if (music.voiceConnection) {
        if (music.voiceConnection.speaking) {
          music.queue.push(args[0]);
          message.channel.send('La musique a été ajoutée à la liste d\'attente');
        }
      }
    }
  }
});

client.login(config.token);
