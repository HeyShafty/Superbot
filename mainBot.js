const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Connecté en tant que ${client.user.username}`);
});

client.on('message', (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  if (message.content.startsWith(config.prefix)) {
    const args = message.content.split(/ +/g);
    const command = args.shift().slice(config.prefix.length).toLowerCase();
    console.log(command);
    console.log(args);

    if (command === 'ping') {
      message.channel.send('Pong...').then((msg) => {
        msg.edit(`Pong! La latence de l'API est de ${Math.round(client.ping)}ms, la latence du bot est de ${msg.createdTimestamp - message.createdTimestamp}ms`);
      });
    } else

    if (command === 'userinformations') {
      if (args.length > 0 && (message.mentions.users.size === 0
      || message.mentions.users.first().bot === true)) {
        message.reply('Vous devez mentionner un **utilisateur** valide (@___)');
        return;
      }
      let targettedUser = message.author;
      if (message.mentions.users.size > 0) {
        targettedUser = message.mentions.users.first();
      }
      const joursTableau = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
      const moisTableau = ['Janvier', 'Février', 'Mars', 'Avril', 'Mais', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
      const statusTableau = {
        online: 'Online',
        idle: 'Idle',
        dnd: 'Do Not Disturb',
        offline: 'Offline/Invisible',
      };
      const embedToSend = new Discord.RichEmbed()
        .setThumbnail(targettedUser.defaultAvatarURL)
        .setColor(message.member.displayColor)
        .setFooter('Brought to you by pickle', 'https://goo.gl/32dztg')
        .setTitle(`Informations sur l'utilisateur ${targettedUser.username}`)
        .addBlankField()
        .addField('ID', targettedUser.id, true)
        .addField('Tag', targettedUser.tag, true)
        .addField('Utilisateur', targettedUser, true)
        .addField('Nom par défaut', targettedUser.username, true)
        .addBlankField()
        .addField('Statut', statusTableau[targettedUser.presence.status], true);
      if (targettedUser.presence.game === null) { embedToSend.addField('Joue à', 'rien', true); } else { embedToSend.addField('Joue à', targettedUser.presence.game.name, true); }
      embedToSend.addField('Dernier message', targettedUser.lastMessage, true)
        .addField('Compte crée le', `${joursTableau[(targettedUser.createdAt.getDay()) - 1]} ${targettedUser.createdAt.getDate()} ${moisTableau[targettedUser.createdAt.getMonth()]} à ${targettedUser.createdAt.getHours()}:${targettedUser.createdAt.getMinutes()}:${targettedUser.createdAt.getSeconds()}`, true)
        .addBlankField()
        .setImage(targettedUser.displayAvatarURL);

      message.delete();
      message.channel.send(embedToSend);
    } else

    if (command === 'roll') {
      if (args.length === 0) {
        args.push(6);
      }
      const roll = Math.floor(Math.random() * args) + 1;

      message.delete();

      message.reply(`Tu as eu un \`${roll}\`                     (sur \`${args}\`)`);
    } else

    if (command === 'purge') {
      if (args.length === 0 || args[0] < config.minPurgeLength || args[0] > config.maxPurgeLength) {
        message.reply(`Il faut donner un nombre entre \`${config.minPurgeLength}\` et \`${config.maxPurgeLength}\` de messages à supprimer`);
        return;
      }

      message.channel.send(`Vous allez supprimer \`${args[0]}\` messages (sans compter la commande et ce message)`, { reply: message.author })
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
                        .then(messages => message.channel.bulkDelete(messages));
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
    }
  }
});

client.login(config.token);
