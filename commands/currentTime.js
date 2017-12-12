exports.run = (client, message, args) => {
  // message.channel.sendMessage(`time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}`);
};

exports.help = {
  name: '',
  aliases: ['', ''],
  description: '',
  usage: '',
  active: false, // !!!
};

exports.flags = {
  a: {
    description: '',
    usage: '',
    active: false, // !!!
  },
};
