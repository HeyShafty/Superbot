exports.run = (client, message, args) => {
  if (!args[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(`= Liste des commandes =\n\n[Faites ${client.config.prefix}help <commande> pour plus de détails]\n\n${client.commands
      .map(c => `${client.config.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`, { code: 'asciidoc' });
  } else {
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.send(`= ${command.help.name} = \n\nUtilisation :: ${command.help.usage}\nAlias       :: ${command.help.aliases.map(a => a).join('  |  ')}\n\n${command.help.description}`, { code: 'asciidoc' });
    } else { message.channel.send('Désolé, cette commande n\'est pas répertoriée.'); }
  }
};

exports.help = {
  name: 'help',
  aliases: ['h', '?'],
  description: 'Affiche toutes les commandes activées, ou donne des détails sur une commande en particulier',
  usage: 'help [Commande]',
  active: true,
};
