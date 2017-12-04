exports.run = (client, message, args) => {
  if (client.music.queue[message.guild.id].songs[0] === undefined) return message.channel.send('Il n\'y a aucune musique dans la queue');
  message.channel.send(
    `= Liste des musiques à suivre =\n
    \n[Liste ${(client.music.queue[message.guild.id].songs.length > 1 ? `des ${client.music.queue[message.guild.id].songs.length} musiques` : 'de la seule musique')} à venir pour le serveur ${message.guild.name}]\n
    \n${client.music.queue[message.guild.id].songs.forEach((song, i) => `${i + 1}. ${song.title} - Ajoutée par: ${song.requester} [\`${song.url}\`]`).join('\n')}`,
    {
      code: 'asciidoc',
      // split: true, // { char: '```asciidoc' } ${(client.music.queue[message.guild.id].songs.length > 15 ? ' *[Seulement les 15 suivantes sont montrées]*' : '')},
    },
  );
};

exports.help = {
  name: 'queue',
  aliases: ['q', 'list'],
  description: 'Affiche la liste des musiques à venir',
  usage: '/queue',
  active: true,
};
