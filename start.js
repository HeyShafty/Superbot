const Discord = require('discord.js');
const fs = require('fs');
const Enmap = require('enmap');
const config = require('./config.json');

const client = new Discord.Client();
client.commands = new Enmap();
client.aliases = new Enmap();
client.music = {};
// ↑↑↑ on crée des Enmaps, c'est à dire des trucs qui permettent de stocker

client.config = config; // on rend les paramètres du bot globales

fs.readdir('./commands/', (err, files) => { // le but est de rendre chaque commande globale, donc on lit les fichiers présents dans le dossier 'commands'
  if (err) console.error(err);
  console.log(`${files.length} fichiers détectés dans le dossier commands.`);
  files.forEach((f) => {
    if (f.split('.').slice(-1)[0] !== 'js') return;
    // ↑ si le ficher n'est pas un ficher JavaScript, il n'est pas lu

    const props = require(`./commands/${f}`);

    if (!props.help.active) return; // si la commande est dite 'désactivée, on ne la lit pas'

    client.commands.set(props.help.name, props);
    /* ↑ on crée une variable globale (client.commands.<nom de la var>)
       qui contient le code de la commande, et que l'on pourra utiliser de n'importe où */

    props.help.aliases.forEach((alias) => {
      client.aliases.set(alias, props.help.name);
      // ↑ on associe chaque 'alias' avec la commande correspondante
    });
  });
});

client.on('message', async (message) => { // se lance pour chaque message
  if (!message.guild) return;
  // ↑ si le message est envoyé dans un serveur (un channel privé ne marche pas)

  if (message.author.bot) return;
  // ↑ si le message vient d'un utilisateur, sinon ça spam les msg en boucle

  if (!message.content.startsWith(client.config.prefix)) return;
  // ↑ si le message ne commence pas par le préfixe ('/')

  const args = message.content.split(/ +/g);
  /* ↑ args = tous les autres mots séparés du premier pas un espace,
     ils sont répartis dans un tableau */

  const command = args.shift().slice(client.config.prefix.length).toLowerCase();
  // ↑ command = le premier mot, celui collé au / de la commande

  message.flags = [];
  args.forEach(a => (a.search(/^-[a-z]$/) === 0 ? message.flags.push(a.split('-')[1]) : ''));
  /*
  En gros on teste si pour chaque mot de l'array args, on a une lettre précédée
    d'un tiret-du-6 '-', on ajoute cette lettre dans message.flags, et ça ne marche QUE
    dans ce cas là.
  */

  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  // ↑ on prend le code associé à la commande

  console.log(`Commande: ${command}`);
  console.log(`Arguments: ${args}`);
  console.log(`Flags: ${message.flags}`);

  if (cmd) {
    cmd.run(client, message, args); // on execute la commande

    // message.delete();

    // message.guild.channels.get('371963640888426497').send(new Discord.RichEmbed()
    //   .setThumbnail(message.author.avatarURL)
    //   .addField('Auteur', message.author, true)
    //   .addField('Channel', message.guild.channel, true)
    //   .addField('Commande', message.content, true)
    //   .setColor(message.member.displayColor));
    // // .setFooter('', 'https://goo.gl/32dztg'));
  }
});

client.on('ready', () => { // se lance quand le bot finit de s'allumer
  console.log(`Connecté en tant que ${client.user.username}`);
  client.user.setGame('DJ Party Tonight');

  const type = 'log';
  const title = 'Bot initialisé';
  const author = client.user;
  const msg = `${author.username} s'est connecté, ${client.users.size} utilisateurs détectés, sur ${client.channels.size} channels de ${client.guilds.size} serveurs.`;
  const avatar = author.avatarURL || author.avatar;
  const embedColors = {
    mention: 3447003,
    error: 16711680,
    log: 16761676,
    warn: 14408465,
  };
  const color = embedColors[type] || 3447003;
  // ↑ on crée les propriétés du webhook à envoyer

  const hook = new Discord.WebhookClient(client.config.webhook.id, client.config.webhook.token);
  // ↑ on crée le webhook
  if (!hook) return console.log(`Le webhook n'a pas pu être établi, voici les paramètres envoyés: [${type}] [${title}]\n[${author.username} (${author.id})]${msg}`);

  // hook.send(new Discord.RichEmbed() // on envoie le message à travers le webhook
  //   .setColor(color)
  //   .setAuthor(author.tag)
  //   .setThumbnail(avatar)
  //   .setTitle(title)
  //   .setDescription(msg));
});

client.login(client.config.token);
