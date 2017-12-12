exports.run = (client, message, args) => {
  if (!message.guild.voiceConnection) {
    return message.channel.send('Le bot n\'est pas connecté');
  } else if (message.guild.voiceConnection.dispatcher.paused) {
    return message.channel.send('Le bot est déjà en pause');
  }

  message.guild.voiceConnection.dispatcher.pause();
  message.channel.send('Pause. ⏸');
};

exports.help = {
  name: 'pause',
  aliases: ['=', 'stop'],
  description: 'Met la musique actuelle en pause',
  usage: 'pause',
  active: true,
};
