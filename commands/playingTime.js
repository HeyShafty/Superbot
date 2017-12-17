exports.run = (client, message, args) => {
  if (!message.guild.voiceConnection) {
    return message.channel.send('Le bot n\'est pas connecté');
  }
  function msToTime(ms) {
    let seconds = ms / 1000;
    const hours = parseInt(seconds / 3600, 10);
    seconds %= 3600;
    const minutes = parseInt(seconds / 60, 10);
    seconds %= 60;
    return `${hours > 0 ? `${Math.round(hours)}h, ` : ''}${minutes > 0 ? `${Math.round(minutes)}m et ` : ''}${seconds > 0 ? `${Math.round(seconds)}s` : ''}`;
  }
  message.channel.send(`Je joue de la musique depuis ${msToTime(message.guild.voiceConnection.dispatcher.totalStreamTime)}`);
};

exports.help = {
  name: 'playingTime',
  aliases: ['pt', 'playT'],
  description: 'Affiche le temps passé depuis que le bot joue de la musique',
  usage: 'playingTime',
  active: true,
};
