exports.run = (client, message, args) => {
  message.guild.voiceConnection.dispatcher.end();
};

exports.help = {
  name: 'skip',
  aliases: ['s', '>'],
  description: 'Passe à la prochaine musique de la queue',
  usage: '/skip',
  active: true,
};
