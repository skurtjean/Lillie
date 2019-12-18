var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

function pokemon(name){
    return new Promise((resolve, reject) => {
        name = name.toLowerCase();
        P.getPokemonByName(name).then(function(data){
            title = firstLetterUp(data.forms[0].name) + ' National dex: ' + data.id;
            type = "**" + ((data.types.length > 1)? firstLetterUp(data.types[0].type.name) + "  " + firstLetterUp(data.types[1].type.name) : firstLetterUp(data.types[0].type.name) ) + "**";
            expBase = "Exp. base: " + data.base_experience;
            altura = "Altura: " + data.height/10 + " metros";
            peso = "Peso: " + data.weight/10 + " KG";
            data.stats.forEach(function(item, index){
                if(item.effort > 0){
                    ev = item.effort;
                    i = index;
                }
            });
            EVP = "EV: " + ev + " pontos em " + firstLetterUp(data.stats[i].stat.name);
            abilities = "";
            data.abilities.forEach(function(item){
                abilities += firstLetterUp(item.ability.name) + ((item.is_hidden)? " H.A." : "") + "\n";
            });
            status = "HP: " + data.stats[5].base_stat + "\nAtaque: " + data.stats[4].base_stat + "\nDefesa: " + data.stats[3].base_stat + "\nSpeed: " + data.stats[0].base_stat + "\nSp. ata.: " + data.stats[2].base_stat + "\nSp. def.: " + data.stats[1].base_stat;
            url = data.sprites.front_default;
            resolve({
                "title": title,
                "description": type + "\n\n" + expBase + ", Utilize o comando !pokemonExp para ter um calculo do exp em determinado level\n" + EVP + "\n" + altura + "\n" + peso,
                "thumbnail": {
                    "url": url,
                },
                "fields": [
                    {
                        "name": "Status",
                        "value": status,
                        "inline": true,
                    },
                    {
                        "name": "Habilidades",
                        "value": abilities,
                        "inline": true,
                    }
                ]
            });
        }).catch(function(error){
            console.log(error);
        });
    });
}

function pokemonExp(name, level){
    return new Promise((resolve, reject) => {
        name = name.toLowerCase();
        P.getPokemonByName(name).then(function(data){
            exp = (1*1*data.base_experience*1*level*1*1*1)/(7*1);
            expVI = (1.5*1.7*data.base_experience*1.5*level*1.5*1*1.2)/(7*1);
            expVII = (1*1.7*data.base_experience*1.5*level*1.5*1.2*1.2)/(7*1);
            expMin = `O exp que um ${name} dará no level ${level} será: ${exp}, podendo sofrer alterações em gerações anteriores a VII.`; 
            expMaxVI = `O máximo de exp que um ${name} dará no level ${level} na Gen VI será: ${expVI} (enfrentando um treinador, o-power ligado, seu pokemon é de uma troca internacional, está segurando um luck egg e já passou de seu level de evolução)`;
            expMaxVII = `O máximo de exp que um ${name} dará no level ${level} na Gen VII será: ${expVII} (roto power ligado, seu pokemon é de uma troca internacional, está segurando um luck egg, já passou de seu level de evolução e possui 2 corações de afeição)`;
            title = 'Exp de um ' + firstLetterUp(data.forms[0].name) + ' no level ' + level;
            url = data.sprites.front_default;
            resolve({
                "title": title,
                "description": expMin + '\n\n' + expMaxVI + '\n\n' + expMaxVII + '\n\n * OBS: Nas Gen VI e VII o Exp. share fará o pokemon no seu time que não entrou na luta receberá metade do exp que deveria, ou seja todo o calculo será feito mas dividirá o resultado por 2',
                "thumbnail": {
                    "url": url,
                }
            });
        }).catch(function(error){
            console.log(error);
        });
    });
}

function pokemonCatch(name){
    return new Promise((resolve, reject) => {
        name = name.toLowerCase();
        P.getPokemon
    })
}

function firstLetterUp(string){
    return string.substring(0,1).toUpperCase() + string.substring(1);
}
module.exports = { pokemon, pokemonExp }