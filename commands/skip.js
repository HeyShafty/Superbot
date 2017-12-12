exports.run = (client, message, args) => {
  if (message.flag.includes('-a')) {
    client.music[message.guild.id].songs.splice(0, client.music[message.guild.id].songs.length);
  }
  message.guild.voiceConnection.dispatcher.end();
};

exports.help = {
  name: 'skip',
  aliases: ['s', '>'],
  description: 'Passe à la prochaine musique de la queue',
  usage: 'skip [-a]',
  active: true,
};
