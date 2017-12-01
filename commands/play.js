const ytdl = require('ytdl-core');

exports.run = (client, message, args) => {
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
  let timesConnected = 0;

  if (timesConnected === 0) { // CREER LES EVENTS EN DEHORS DE TOUSSA
    calledVoiceChannel.join()
      .then((connection) => {
        let voiceConnection;
        client.music.set(voiceConnection, connection);
        let queue;
        client.music.set(queue, []);
        timesConnected += 1;
        const stream = ytdl(args[0], { filter: 'audioonly' });
        const dispatcher = client.music.get(voiceConnection).playStream(stream, streamOptions);

        dispatcher.on('end', () => {
          calledVoiceChannel.leave();
        });
        dispatcher.on('error', (e) => {
          console.log(e); message.channel.send('Une erreur s\'est produite.');
        });
      });
  }
};

exports.help = {
  name: 'play',
  aliases: ['p', 'music'],
  description: 'Joue la musique dans un channel vocal à partir d\'un lien YouTube. Vous devez être dans un channel vocal lorsque vous exécutez cette commande !',
  usage: '/play [Lien YouTube]',
  active: true,
};
