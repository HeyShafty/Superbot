exports.run = (client, message, args) => {
  message.channel.send(`= Liste des musiques à suivre =\n\n[Faites la commande /play pour en ajouter une]\n\n${client.music.queue.map(c => `${c}`).join('\n')}`, { code: 'asciidoc' });
};

exports.help = {
  name: 'queue',
  aliases: ['q', 'list'],
  description: 'Affiche la liste des musiques à venir',
  usage: '/queue',
  active: true,
};
