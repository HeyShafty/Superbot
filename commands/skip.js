exports.run = (client, message, args) => {
  if (!message.guild.voiceConnection) return message.channel.send('Le bot n\'est pas connecté');

  if (message.flags.includes('a')) {
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

exports.flags = {
  a: {
    description: 'Passe la musique actuelle et toutes celles à venir',
    usage: '-a',
    active: true,
  },
};
