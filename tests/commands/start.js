exports.run = (client, msg, args) => {
  console.log(args); // juste pour le linter comme ça il est content xdd
  msg.channel.send('OLALA CA MARCHE DITES DONC');
  const cmd = client.commands.get('start');
  msg.channel.send(`Cette commande s'appelle ${cmd.help.name}, elle a ${cmd.help.aliases.length} alias. DESC: ${cmd.help.description}`);
};

exports.help = {
  name: 'start',
  usage: 'start',
  aliases: [],
  description: 'This is a testing command, please don\'t use it kthx',
};
