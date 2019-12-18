const Discord = require('discord.js');
const client = new Discord.Client();
const configs = require('./LillieConfig.json');
const PokeFunction = require('./FuncoesApis/PokeApi');

client.on('ready', function (evt) {
    console.log(`Logged in as ${client.user.tag}!`);
    client.users.get('439187903126700045').send(`Acabo de logar como ${client.user.tag}`);
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
            case 'pokemonExp':
                if(args.length < 3){
                    message.channel.send('Por favor informe o level do pokemon');
                }
                else{
                    PokeFunction.pokemonExp(args[1], args[2]).then(function(data){
                        message.channel.send({embed: data});
                    });
                }
            break;
        }
    }
});

client.login(configs.tokenDisc);