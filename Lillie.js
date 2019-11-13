const Discord = require('discord.js');
const client = new Discord.Client();
const configs = require('./LillieConfig.json');
const PokeFunction = require('./FuncoesApis/PokeApi');
client.on('ready', function (evt) {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', function (message) {
    if (message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
        switch(cmd) {
            case 'pokemon':
                PokeFunction.pokemon(args[1]).then(function(data){
                    message.channel.send({embed: data});
                });
            break;
            case 'pokemon-full':
                PokeFunction.pokemonFull(args[1]).then(function(data){
                    message.author.send({embed: data});
                });
            break;
        }
    }
});

client.login(configs.tokenDisc);