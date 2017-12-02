const ytdl = require('ytdl-core');

exports.run = (client, message, args) => {
  if (!message.member.voiceChannel) {
    message.reply('Il faut que vous soyez dans un channel vocal pour exécuter cette commande');
    return;
  } else if (args.length <= 0 || !args[0].startsWith('https://www.youtube.com/watch?v=')) {
    message.reply('Il faut donner le lien d\'une vidéo YouTube [https://www.youtube.com/watch?v=]');
    return;
  }

  const calledVoiceChannel = message.member.voiceChannel;
  const streamOptions = { seek: 0, volume: 0.1 };
  // ↑ il faut que ces paramètres soient générals & modifiables

  let timesConnected = 0;

  if (timesConnected === 0) { // CREER LES EVENTS EN DEHORS DE TOUSSA ???
    calledVoiceChannel.join()
      .then((connection) => {
        let voiceConnection;
        let queue;
        client.music.set(voiceConnection, connection);
        client.music.set(queue, []);
        timesConnected += 1;

        const stream = ytdl(args[0], { filter: 'audioonly' });
        const dispatcher = client.music.get(voiceConnection).playStream(stream, streamOptions); // .playStream() not a function

        dispatcher.on('end', () => {
          calledVoiceChannel.leave();
        });
        dispatcher.on('error', (e) => {
          console.log(e);
          message.channel.send('Une erreur s\'est produite.');
        });
      });
  }
};

exports.help = {
  name: 'play',
  aliases: ['p', 'music'],
  description: 'Joue la musique dans un channel vocal à partir d\'un lien YouTube.',
  usage: '/play <Lien YouTube>',
  active: true,
};
