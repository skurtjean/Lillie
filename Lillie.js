const Discord = require('discord.js');
const client = new Discord.Client();
const configs = require('./LillieConfig.json');
const PokeFunction = require('./Funcoes/PokeApi');
const excel = require('./Funcoes/Excel');
const converter = require('./Funcoes/Bases');
const fs = require('fs');
var path = require("path");

client.on('ready', function(evt) {
    client.users.get('439187903126700045').send(`Acabo de logar como ${client.user.tag}!`);
});

client.on('message', async function(message) {
    if (message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
        switch (cmd) {
            case 'pokemon':
                PokeFunction.pokemon(args[1]).then(function(data) {
                    message.channel.send({ embed: data });
                });
                break;
            case 'pokemon-full':
                PokeFunction.pokemonFull(args[1]).then(function(data) {
                    message.author.send({ embed: data });
                });
                break;
            case 'tabela':
                var caminho = "";
                message.author.send('Sua tabela está sendo gerada, aguarde.').then((msg) => {
                    excel.tabelaVerdade(args[1], args[2]).then(async function(data) {
                        caminho = data;
                        checkExistsWithTimeout(caminho, 10000).then(function(data) {
                            if (data === true) {
                                var attachment = new Discord.Attachment(caminho, 'Arquivo.xlsx');
                                msg.delete();
                                message.author.send('Aqui está sua tabela:', attachment);
                            } else {
                                msg.delete();
                                message.author.send(data);
                            }
                        });
                    });
                });
                break;
            case 'converter':
                if (args.length != 4) {
                    console.log('aqui');
                    message.channel.send('Por favor preencha as informações corretamente. (!converter {numero} {número da base do numero} {número da base a ser convertida})');
                } else {
                    if (Number.isInteger(parseInt(args[2])) && Number.isInteger(parseInt(args[3]))) {
                        if (parseInt(args[3]) < 37 && parseInt(args[2]) < 37) {
                            converter.converter(args[1], args[2], args[3]).then((data) => {
                                if (data == false) {
                                    message.channel.send('Tenha certeza da base do número antes de preenche-la!');
                                } else {
                                    message.channel.send('O número ' + args[1] + ' base ' + args[2] + ' na base ' + args[3] + ' é ' + data);
                                }
                            });
                        } else {
                            message.channel.send('Desculpe, no momento, só consigo trabalhar com bases menores que 37');
                        }
                    } else {
                        message.channel.send('Por favor preencha as informações corretamente. (!converter {numero} {número da base do numero} {número da base a ser convertida})');
                    }
                }
                break;
            case 'calcular':
                if (args.length != 7) {
                    message.channel.send('Por favor preencha as informações corretamente. (!calcular {numero} {número da base do primeiro numero} {operação (+, -, *, /)} {segundo numero} {número da base do segundo numero} {número da base da resposta})');
                } else {
                    if (Number.isInteger(parseInt(args[2])) && Number.isInteger(parseInt(args[5])) && Number.isInteger(parseInt(args[6])) && (args[3] == '+' || args[3] == '-' || args[3] == '/' || args[3] == '*')) {
                        if (parseInt(args[2]) < 37 && parseInt(args[5]) < 37 && parseInt(args[5]) < 37) {
                            converter.calcular(args[1], args[2], args[3], args[4], args[5], args[6]).then((data) => {
                                if (data == false) {
                                    message.channel.send('Tenha certeza da base do número antes de preenche-la!');
                                } else if (data != 'undefined') {
                                    message.channel.send('O resultado de ' + args[1] + ' (' + args[2] + ') ' + args[3] + ' ' + args[4] + ' (' + args[5] + ') é ' + data + ' (' + args[6] + ')');
                                } else {
                                    message.channel.send('Desculpe, eu ainda não consigo converter o resultado desta conta para a base solicitada');
                                }
                            });
                        } else {
                            message.channel.send('Desculpe, no momento, só consigo trabalhar com bases menores que 37');
                        }
                    } else {
                        message.channel.send('Por favor preencha as informações corretamente. (!calcular {numero} {número da base do primeiro numero} {operação (+, -, *, /)} {segundo numero} {número da base do segundo numero} {número da base da resposta})');
                    }
                }
                break;
                break;
            case 'pokemonExp':
                if (args.length < 3) {
                    message.channel.send('Por favor informe o level do pokemon');
                } else {
                    PokeFunction.pokemonExp(args[1], args[2]).then(function(data) {
                        message.channel.send({ embed: data });
                    });
                }
                break;
        }
    }
});

function checkExistsWithTimeout(filePath, timeout) {
    return new Promise(function(resolve, reject) {

        var timer = setTimeout(function() {
            watcher.close();
            resolve('Desculpe, não consegui criar sua tabela.');
        }, timeout);

        fs.access(filePath, fs.constants.R_OK, function(err) {
            if (!err) {
                clearTimeout(timer);
                watcher.close();
                resolve(true);
            }
        });

        var dir = path.dirname(filePath);
        var basename = path.basename(filePath);
        var watcher = fs.watch(dir, function(eventType, filename) {
            if (eventType === 'rename' && filename === basename) {
                clearTimeout(timer);
                watcher.close();
                resolve(true);
            }
        });
    });
}

client.login(configs.tokenDisc);