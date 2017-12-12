# Official-SuperBot
Hey ici c'est pour les fichier du SuperBot, donc allez voir ailleurs si vous cherchez les codes nucléaires...

# A quoi sert ce bot?
Il s'agit ici principalement d'un bot pour [Discord](https://discordapp.com) ![Discord](https://goo.gl/2xXR9v)

Sa fonction est de jouer de la musique. Aussi simple que ça. Voila.

Des questions? Vous me trouverez souvent [ici](https://discord.gg/3W6eFsE)!

# Guide d'installation **(PAS FINI)**


# Tout sur ce bot
## TO-DO list
- [x] Faire marcher le bot
- [x] Généraliser les termes *args, client, etc...*
- [x] `/play`
- [x] `/help`
- [x] Faire afficher les alias des commandes dans le /help
- [x] `/queue`
- [x] `/skip`
- [x] `/clearqueue`
- [ ] Event: 'progress' dans ytld
- [x] Ajouter les flags dans les exports
- [x] Ajouter les flags dans les messages
  * [ ] `-v` pour volume dans `/play`
  * [x] `-a` dans `/skip`
- [x] Ajouter les flags dans le `/help`
- [x] `/volume`
- [x] `/stop`
- [x] `/resume`
- [ ] `/previous`
- [ ] RichEmbed dans un channel spécifique avec la lecture d'une vidéo
  * [ ] Réactions pour `/stop` → `/resume`
  * [ ] Pour augmenter le volume
  * [ ] Skip la musique
- [x] Pouvoir trouver une musique avec le nom, et pas juste un link brut
- [ ] Playlists intégrées, changeable à guise → `/playlist`
- [ ] Playlist par défaut sur le bot
- [ ] Déplacer automatiquement un message dans un channel spécifié si il est en rapport avec le bot

## Tableau des fonctions et commandes actuelles **(PAS A JOUR)**
Commande | Fonction
------------ | -------------
play | joue de la musique

## Comprendre le bot
### Variable globales **(PAS A JOUR)**
Nom | Définie dans | Utilité
------------- | ------------- | -------------
client | start.js | Contient toutes les propriétés regardant le bot, commandes, token...
message | start.js, 'message' event | Contient toutes les propriétés du message traité
args | start.js | Il s'agit des arguments apportés par le message

### Enmap?
Tout est à voir [ici](https://github.com/eslachance/enmap)

# Comment contribuer pour ce bot?
## Proposez vos commandes
Vous pouvez facilement créer vos propres commandes en utilisant le pattern suivant:

```js
exports.run = (client, message, args) => {
  // Le code de la commande est à rédiger ici!
};

exports.help = {
  name: '',
  aliases: ['', ''],
  description: '',
  usage: '',
  active: false, // n'oubliez pas de mettre `true` pour que la commande soit prise en compte
};
```

## Proposez l'intégration de vos commandes
Si vous connaissez bien GitHub, vous pouvez passer cette partie, cependant il serait normal que vous soyez nouveau!

### Rédigez votre commande **(PAS FINI)**
Il en va de soi que pour partager des nouvelles fonctionalités pour le bot, il faut que celle-ci soit codée.
**Il faut impérativement que vos partages soient fonctionnels sous peine d'être rejetés**

### Proposez un pull request **(PAS FINI)**
