const Discord = require('discord.js');
const client = new Discord.Client();
const configs = require('./jsons/LillieConfig.json');
const PokeFunction = require('./Funcoes/PokeApi');
const excel = require('./Funcoes/Excel');
const converter = require('./Funcoes/Bases');
const avisos = require('./Funcoes/Avisos');
const fs = require('fs');
var path = require("path");

const pathAvisosGenshin = './jsons/avisosGenshin.json';
const pathAvisosBangDream = './jsons/avisosBangDream.json'
const pathAvisosHonkai = './jsons/avisosHonkai.json';

client.on('ready', function(evt) {
    //client.users.get('439187903126700045').send(`Acabo de logar como ${client.user.tag}!`);
});

client.on('message', async function(message) {
    try {
        if (message.content.substring(0, 1) == '!') {
            var args = message.content.substring(1).split(' ');
            var cmd = args[0];
            switch (cmd) {
                // Manda informações sobre um determinado pokemon
                case 'pokemon':
                    PokeFunction.pokemon(args[1]).then(function(data) {
                        message.channel.send({ embed: data });
                    });
                break;
    
                // Manda informações completas sobre um pokemon
                case 'pokemon-full':
                    PokeFunction.pokemonFull(args[1]).then(function(data) {
                        message.author.send({ embed: data });
                    });
                break;
    
                // Monta uma tabela da verdade
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
    
                // Converte para multiplas bases númericas
                case 'converter':
                    if (args.length != 4) {
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
    
                // Calcula operações em multiplas bases númericas
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
    
                // Exp do pokemon
                case 'pokemonExp':
                    if (args.length < 3) {
                        message.channel.send('Por favor informe o level do pokemon');
                    } else {
                        PokeFunction.pokemonExp(args[1], args[2]).then(function(data) {
                            message.channel.send({ embed: data });
                        });
                    }
                break;
    
                // Seta aviso de resina Genshin
                case 'aviso-resina':
                    if (args.length < 2) {
                        message.channel.send('Por favor preencha o minimo de informações corretamente. (!aviso-resina {resina agora} [servidor (só coloque se possui 2 contas e vai colocar 2 avisos)])');
                    } else {
                        avisos.aviso_resina(args, message.author.id).then(function(data) {
                            message.author.send(data);
                        });
                    }
                break;
    
                // Seta aviso de boosts Bang Dream
                case 'aviso-boosts':
                    if (args.length < 2) {
                        message.channel.send('Por favor preencha o minimo de informações corretamente. (!aviso-boosts {boosts agora} [servidor (só coloque se possui 2 contas e vai colocar 2 avisos)])');
                    } else {
                        avisos.aviso_boosts(args, message.author.id).then(function(data) {
                            message.author.send(data);
                        });
                    }
                break;
    
                // Seta aviso de stamina Honkai
                case 'aviso-stamina':
                    if (args.length < 3) {
                        message.channel.send('Por favor preencha o minimo de informações corretamente. (!aviso-stamina {stamina agora} {stamina máxima} [servidor (só coloque se possui 2 contas e vai colocar 2 avisos)])');
                    } else {
                        avisos.aviso_stamina(args, message.author.id).then(function(data) {
                            message.author.send(data);
                        });
                    }
                break;
    
                // Quanto de resina possui Genshin
                case 'resina':
                    avisos.resinas(args, message.author.id).then(function(data) {
                        message.author.send(data);
                    });
                break;
    
                // Quantos boosts possui Bang Dream
                case 'boosts':
                    avisos.boosts(args, message.author.id).then(function(data) {
                        message.author.send(data);
                    });
                break;
    
                // Quantos de stamina possui Honkai
                case 'stamina':
                    avisos.stamina(args, message.author.id).then(function(data) {
                        message.author.send(data);
                    });
                break;

                // Remove aviso de resina Genshin
                case 'remove-resina':
                    avisos.remove_aviso_genshin(args, message.author.id).then(function(data) {
                        message.author.send(data);
                    });
                break;
    
                // Remove aviso de boosts Bang Dream
                case 'remove-boosts':
                    avisos.remove_aviso_bangdream(args, message.author.id).then(function(data) {
                        message.author.send(data);
                    });
                break;
    
                // Remove aviso de stamina Honkai
                case 'remove-stamina':
                    avisos.remove_aviso_honkai(args, message.author.id).then(function(data) {
                        message.author.send(data);
                    });
                break;
    
            }
        }
    } catch (error) {
        client.users.get('439187903126700045').send(error);
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

function verificaAvisos() {
    var avisosGenshin = JSON.parse(fs.readFileSync(pathAvisosGenshin));
    var data = new Date();
    var avisos_genshin = avisosGenshin.filter(function(value){
        data_full = new Date(value.data_full);
        if(Math.floor(data_full.getTime()/1000) <= Math.floor(data.getTime()/1000)){
            return true
        }
        else{
            return false;
        }
    });
    avisos_genshin.forEach(element => {
        id_aviso = avisosGenshin.findIndex(function(value){
            if(value.id == element.id && value.server == element.server){
                return true
            }
            else{
                return false;
            }
        });
        avisosGenshin.splice(id_aviso, 1);
        fs.writeFileSync(pathAvisosGenshin, JSON.stringify(avisosGenshin, null, 2));
        client.users.get(element.id).send("Sua resina está completa no servidor " + element.server + "!");
    });

    var avisosBangDream = JSON.parse(fs.readFileSync(pathAvisosBangDream));
    var data = new Date();
    var avisos_BangDream = avisosBangDream.filter(function(value){
        data_full = new Date(value.data_full);
        if(Math.floor(data_full.getTime()/1000) <= Math.floor(data.getTime()/1000)){
            return true
        }
        else{
            return false;
        }
    });
    avisos_BangDream.forEach(element => {
        id_aviso = avisosBangDream.findIndex(function(value){
            if(value.id == element.id && value.server == element.server){
                return true
            }
            else{
                return false;
            }
        });
        avisosBangDream.splice(id_aviso, 1);
        fs.writeFileSync(pathAvisosBangDream, JSON.stringify(avisosBangDream, null, 2));
        client.users.get(element.id).send("Seus boosts recarregaram completamente no servidor " + element.server + "!");
    });

    var avisosHonkai = JSON.parse(fs.readFileSync(pathAvisosHonkai));
    var data = new Date();
    var avisos_Honkai = avisosHonkai.filter(function(value){
        data_full = new Date(value.data_full);
        if(Math.floor(data_full.getTime()/1000) <= Math.floor(data.getTime()/1000)){
            return true
        }
        else{
            return false;
        }
    });
    avisos_Honkai.forEach(element => {
        id_aviso = avisosHonkai.findIndex(function(value){
            if(value.id == element.id && value.server == element.server){
                return true
            }
            else{
                return false;
            }
        });
        avisosHonkai.splice(id_aviso, 1);
        fs.writeFileSync(pathAvisosHonkai, JSON.stringify(avisosHonkai, null, 2));
        client.users.get(element.id).send("Sua stamina recarregou completamente no servidor " + element.server + "!");
    });
}

setInterval(verificaAvisos,1000);


client.login(configs.tokenDisc);