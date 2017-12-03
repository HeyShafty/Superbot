exports.run = (client, message, args) => {
  // if (queue[msg.guild.id] === undefined) return msg.channel.sendMessage(`Add some songs to the queue first with ${tokens.prefix}add`);
  message.channel.send(`= Liste des musiques à suivre =\n\n[Faites la commande /play pour en ajouter une]\n\n${client.music.queue
    .forEach((c, i) => `${i + 1}. ${c} - Ajoutée par: ${client.music.queue.requester}`).join('\n')}`, { code: 'asciidoc' });
};

exports.help = {
  name: 'queue',
  aliases: ['q', 'list'],
  description: 'Affiche la liste des musiques à venir',
  usage: '/queue',
  active: false,
};
