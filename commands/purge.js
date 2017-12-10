
exports.run = (client, message, args) => {
  if (args.length === 0 || args[0] < 2 || args[0] > 100) return message.reply('Il faut donner un nombre entre `2` et `100` de messages à supprimer');
  let lastMessage;
  message.channel.fetchMessages({
    limit: args[0],
  })
    .then((messages) => {
      const mArray = [];
      messages.forEach(m => mArray.push(m));
      lastMessage = mArray[mArray.length - 1];
      message.channel.send(`Vous allez supprimer \`${args[0]}\` messages, soit jusqu'au message \`${lastMessage.content}\``, { reply: message.author })
        .then((msg) => {
          msg.react('🚫').then(() => {
            msg.react('✅').then(() => {
              const collector = msg.createReactionCollector((reaction, user) => {
                if ((reaction.emoji.name === '🚫' || reaction.emoji.name === '✅') && user.id === message.author.id) {
                  return true;
                }
              }, { time: 15000 });
              collector.on('collect', (reaction) => {
                if (reaction.emoji.name === '🚫' && reaction.count > 1) {
                  msg.delete();
                  message.delete();
                  return;
                }
                if (reaction.emoji.name === '✅' && reaction.count > 1) {
                  msg.delete().then(() => {
                    message.delete().then(() => {
                      message.channel.fetchMessages({
                        limit: args[0],
                      })
                        .then((messages) => {
                          message.channel.bulkDelete(messages);
                        });
                    });
                  });
                }
              });
              collector.on('end', (collected) => {
                if (collected.size < 1) {
                  message.channel.send('Pas de réponse détectée')
                    .then((m) => {
                      setTimeout(() => {
                        m.delete();
                        msg.delete();
                        message.delete();
                      }, 2000);
                    });
                }
              });
            });
          });
        });
    });
};

exports.help = {
  name: 'purge',
  aliases: ['del'],
  description: 'Supprime le nombre de messages donnés',
  usage: 'purge <nombre de messages>',
  active: true,
};
