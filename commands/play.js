const ytdl = require('ytdl-core');

exports.run = (client, message, args) => {
  const calledVoiceChannel = message.member.voiceChannel;
  if (!calledVoiceChannel) {
    message.reply('Il faut que vous soyez dans un channel vocal pour exécuter cette commande');
    return;
  } else if (args.length <= 0 || !args[0].startsWith('https://www.youtube.com/watch?v=')) {
    message.reply('Il faut donner le lien d\'une vidéo YouTube [https://www.youtube.com/watch?v=]');
    return;
  }

  const streamOptions = { seek: 0, volume: 0.1 };
  // ↑ il faut que ces paramètres soient générals & modifiables

  let botConnection;

  calledVoiceChannel.join()
    .then((connection) => {
      client.music.set(botConnection, connection);
      let stream = ytdl(args[0], { filter: 'audioonly' });
      let dispatcher = client.music.get(botConnection).playStream(stream, streamOptions);

      dispatcher.on('end', () => {
        calledVoiceChannel.leave();
      });
    });
};

exports.help = {
  name: 'play',
  aliases: ['p', 'music'],
  description: 'Joue la musique dans un channel vocal à partir d\'un lien YouTube.',
  usage: '/play <Lien YouTube>',
  active: true,
};
