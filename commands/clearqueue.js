exports.run = (client, message, args) => {
  if (client.music[message.guild.id].songs[0] === undefined) return message.channel.send('Il n\'y a aucune musique dans la queue');
  client.music[message.guild.id].songs.splice(0, client.music[message.guild.id].songs.length);
  message.channel.send('Toutes les musiques ont étés enlevées de la queue');
};

exports.help = {
  name: 'clearqueue',
  aliases: ['empty', 'cq', 'cc'],
  description: 'Vide la queue',
  usage: 'clearqueue',
  active: true,
};
