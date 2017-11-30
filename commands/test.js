exports.run = (client, message, args) => {
  message.channel.send('Le teste marche !');
};

exports.help = {
  name: 'test',
  aliases: ['t', 'isitworking?'],
  description: 'Le but est de tester si le bot marche',
  usage: '/test',
  active: true,
};
