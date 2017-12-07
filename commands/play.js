const ytdl = require('ytdl-core');
const search = require('youtube-search');
const Discord = require('discord.js');

exports.run = (client, message, args) => {
  /*
  Vérifier si la vidéo n'est pas trop longue
  Pouvoir changer maxResults avec les flags, ou forcer de prendre la premiere vidéo trouvée
  */
  const calledVoiceChannel = message.member.voiceChannel;
  if (!calledVoiceChannel || calledVoiceChannel.type !== 'voice') return message.reply('Je n\'ai pas pu me connecter au channel vocal');
  if (args.length <= 0) return message.channel.send('Il faut donner une vidéo à jouer');

  if (!message.guild.voiceConnection) {
    calledVoiceChannel.join();
  }

  let dispatcher;

  function YouTubeSearch() {
    ytdl.getInfo(args[0], (e, info) => {
      if (e) return message.channel.send(`Lien YouTube invalde: ${e}`);
      if (!client.music.queue.hasOwnProperty(message.guild.id)) {
        client.music.queue[message.guild.id] = {};
        client.music.queue[message.guild.id].playing = false;
        client.music.queue[message.guild.id].songs = [];
      }
      client.music.queue[message.guild.id].songs.push({
        url: args[0],
        title: info.title,
        requester: message.author.username,
      });
      message.channel.send(`Ajouté **${info.title}** à la queue`);

      if (client.music.queue[message.guild.id].playing === false) {
        (function play(music) { // je sais pas trop d'où vient la variable music
          console.log(music);
          if (music === undefined) {
            delete client.music.queue[message.guild.id];
            return message.channel.send('La queue est vide, déconnection...').then(() => {
              message.member.voiceChannel.leave();
            });
          }
          message.channel.send(`Lecture de: **${music.title}** ajoutée par: **${music.requester}**`);
          dispatcher = message.guild.voiceConnection.playStream(ytdl(music.url, { filter: 'audioonly' }), { seek: 0, volume: 0.5 });
          client.music.queue[message.guild.id].playing = true;
          dispatcher.on('end', () => {
            play(client.music.queue[message.guild.id].songs.shift());
          });
          dispatcher.on('error', err => message.channel.send(`error: ${err}`).then(() => {
            play(client.music.queue[message.guild.id].songs.shift());
          }));
        }(client.music.queue[message.guild.id].songs.shift()));
      }
    });
  }

  if (args[0].startsWith('https://www.youtube.com/watch?v=')) {
    YouTubeSearch();
  } else {
    search(args.join(' '), { maxResults: 3, key: 'AIzaSyACaK9isx3agyfTu-iUuL1Npzp9tF8Sp-k' }, (e, results) => {
      if (e) return message.channel.send(`Erreur: ${e}`);
      const nomVids = [];
      const urlThumbnails = [];
      const urlVids = [];
      const msgIDs = [];
      results.forEach((r) => {
        if (r.kind !== 'youtube#video') return;
        nomVids.push(r.title);
        urlVids.push(r.link);
        urlThumbnails.push(r.thumbnails.medium.url);
      });
      message.reply('Choisissez entre les vidéos suivantes').then(msg => msgIDs.push(msg.id));
      for (let i = 0; i < nomVids.length; i += 1) {
        message.channel.send(new Discord.RichEmbed()
          .setColor(3447003)
          .addField(nomVids[i], urlVids[i])
          .setThumbnail(urlThumbnails[i])).then(msg => msgIDs.push(msg.id));
      }
      message.channel.send('​').then((msg) => { // il y a un caractère dans la string
        setTimeout(() => {
          msg.react('1⃣').then(() => {
            msg.react('2⃣').then(() => {
              msg.react('3⃣').then(() => {
                const collector = msg.createReactionCollector((reaction, user) => {
                  if ((reaction.emoji.name === '1⃣' || reaction.emoji.name === '2⃣' || reaction.emoji.name === '3⃣') && user.id === message.author.id) {
                    return true;
                  }
                }, { time: 15000 });
                collector.on('collect', (reaction) => {
                  if (reaction.emoji.name === '1⃣' && reaction.count > 1) {
                    args[0] = urlVids[0];
                    msg.delete();
                    msgIDs.forEach(id => message.channel.fetchMessage(id)
                      .then(m => m.delete())
                      .catch(console.error));
                    YouTubeSearch();
                  }
                  if (reaction.emoji.name === '2⃣' && reaction.count > 1) {
                    args[0] = urlVids[1];
                    msg.delete();
                    msgIDs.forEach(id => message.channel.fetchMessage(id)
                      .then(m => m.delete())
                      .catch(console.error));
                    YouTubeSearch();
                  }
                  if (reaction.emoji.name === '3⃣' && reaction.count > 1) {
                    args[0] = urlVids[2];
                    msg.delete();
                    msgIDs.forEach(id => message.channel.fetchMessage(id)
                      .then(m => m.delete())
                      .catch(console.error));
                    YouTubeSearch();
                  }
                });
                collector.on('end', (collected) => {
                  if (collected.size < 1) {
                    if (collected.size < 1) {
                      message.channel.send('Pas de réponse détectée')
                        .then((mes) => {
                          setTimeout(() => {
                            mes.delete();
                            msg.delete();
                            msgIDs.forEach(id => message.channel.fetchMessage(id)
                              .then(m => m.delete())
                              .catch(console.error));
                          }, 2000);
                        });
                    }
                  }
                });
              });
            });
          });
        }, 3000);
      });
    });
  }
};

exports.help = {
  name: 'play',
  aliases: ['p', 'music'],
  description: 'Joue la musique dans un channel vocal à partir d\'un lien YouTube.',
  usage: '/play <Lien YouTube>',
  active: true,
};
