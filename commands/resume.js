exports.run = (client, message, args) => {
  if (!message.guild.voiceConnection) {
    return message.channel.send('Le bot n\'est pas connecté');
  } else if (!message.guild.voiceConnection.dispatcher.paused) {
    return message.channel.send('Le bot n\'est pas en pause');
  }

  message.guild.voiceConnection.dispatcher.resume();
  message.channel.send('On reprend ! ▶');
};

exports.help = {
  name: 'resume',
  aliases: ['=>', 'dpause'],
  description: 'Relance le bot mis en pause',
  usage: 'resume',
  active: true,
};
