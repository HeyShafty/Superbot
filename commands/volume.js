exports.run = (client, message, args) => {
  /*
  .volumeDecibels
  */
  if (!message.guild.voiceConnection) {
    message.channel.send('Le bot n\'est pas connecté');
  } else if (args.length <= 0) {
    message.channel.send(`Le volume actuel est de \`${message.guild.voiceConnection.dispatcher.volume}\``);
  } else {
    message.guild.voiceConnection.dispatcher.setVolume(args[0])
    message.channel.send(`Le nouveau volume est de \`${args[0]}\``);
  }
};

exports.help = {
  name: 'volume',
  aliases: ['v'],
  description: 'Affiche, change le volume',
  usage: 'volume [volume]',
  active: true,
};
