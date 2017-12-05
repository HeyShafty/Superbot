const ytdl = require('ytdl-core');

exports.run = (client, message, args) => {
  const calledVoiceChannel = message.member.voiceChannel;
  if (!calledVoiceChannel || calledVoiceChannel.type !== 'voice') return message.reply('Je n\'ai pas pu me connecter au channel vocal');
  if (args.length <= 0 || !args[0].startsWith('https://www.youtube.com/watch?v=')) return message.reply('Il faut donner le lien d\'une vidéo YouTube [https://www.youtube.com/watch?v=]');

  if (!message.guild.voiceConnection) {
    calledVoiceChannel.join();
  }

  let dispatcher;

  ytdl.getInfo(args[0], (e, info) => {
    if (e) return message.channel.send(`Lien YouTube invalde: ${e}`);
    if (!client.music.queue.hasOwnProperty(message.guild.id)) {
      client.music.queue[message.guild.id] = {};
      client.music.queue[message.guild.id].playing = false;
      client.music.queue[message.guild.id].songs = [];
    }
    client.music.queue[message.guild.id].songs.push({
      url: args[0],
      title: info.title,
      requester: message.author.username,
    });
    message.channel.send(`Ajouté **${info.title}** à la queue`);

    if (client.music.queue[message.guild.id].playing === false) {
      (function play(music) { // je sais pas trop d'où vient la variable music
        console.log(music);
        if (music === undefined) {
          delete client.music.queue[message.guild.id];
          return message.channel.send('La queue est vide, déconnection...').then(() => {
            message.member.voiceChannel.leave();
          });
        }
        message.channel.send(`Lecture de: **${music.title}** ajoutée par: **${music.requester}**`);
        dispatcher = message.guild.voiceConnection.playStream(ytdl(music.url, { filter: 'audioonly' }), { seek: 0, volume: 0.5 });
        client.music.queue[message.guild.id].playing = true;
        dispatcher.on('end', () => {
          play(client.music.queue[message.guild.id].songs.shift());
        });
        dispatcher.on('error', err => message.channel.send(`error: ${err}`).then(() => {
          play(client.music.queue[message.guild.id].songs.shift());
        }));
      }(client.music.queue[message.guild.id].songs.shift()));
    }
  });
};

exports.help = {
  name: 'play',
  aliases: ['p', 'music'],
  description: 'Joue la musique dans un channel vocal à partir d\'un lien YouTube.',
  usage: '/play <Lien YouTube>',
  active: true,
};
