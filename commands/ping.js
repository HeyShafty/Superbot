exports.run = (client, message, args) => {
  message.channel.send('Ping?').then(m => m.edit(`Pong! La latence est de ${m.createdTimestamp - message.createdTimestamp}ms. La latence de l'API est de ${Math.round(client.ping)}ms`));
};

exports.help = {
  name: 'ping',
  aliases: ['p', 'ms'],
  description: 'Donne un ping approximatif du bot et de l\'API',
  usage: '/ping',
  active: true,
};
