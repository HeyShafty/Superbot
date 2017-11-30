const Discord = require('discord.js');
const c = require('./commands/start.js');
const Enmap = require('enmap');

const client = new Discord.Client();
client.commands = new Enmap();
client.aliases = new Enmap();

client.commands.set(c.help.name, c);
c.help.aliases.forEach((alias) => {
  client.aliases.set(alias, c.help.name);
});

client.on('message', (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  if (message.content.startsWith('!')) {
    const args = message.content.split(/ +/g);
    const command = args.shift().slice('!'.length).toLowerCase();

    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (cmd) {
      cmd.run(client, message, args);
    } else if (client.tags.has(command)) {
      message.edit(`${args.join(' ')} ${client.tags.get(command).contents}`);
    }
  }
});

client.login('MzgxODYwODk0MDkyNjg5NDA4.DPioQQ.gSdQIDjwx2JSNIr2CrdLXzYtGrk');
