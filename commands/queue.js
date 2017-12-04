exports.run = (client, message, args) => {
  if (client.music.queue[message.guild.id].songs[0] === undefined) return message.channel.send('Il n\'y a aucune musique dans la queue');
  const brackets = `[Liste ${(client.music.queue[message.guild.id].songs.length > 1 ? `des ${client.music.queue[message.guild.id].songs.length} musiques` : 'de la seule musique')} à venir pour le serveur '${message.guild.name}']`;
  const songList = [];
  client.music.queue[message.guild.id].songs.forEach((song, i) => songList.push(`${i + 1}. ${song.title} - Ajoutée par: ${song.requester} [\`${song.url}\`]`));
  message.channel.send(`= Liste des musiques à suivre =\n\n${brackets}\n\n${songList.join('\n')}`, { 
    code: 'asciidoc',
    split: true,
  });
};

exports.help = {
  name: 'queue',
  aliases: ['q', 'list'],
  description: 'Affiche la liste des musiques à venir',
  usage: '/queue',
  active: true,
};
