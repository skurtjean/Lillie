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
                "description": type + "\n\n" + expBase + "\n" + EVP + "\n" + altura + "\n" + peso,
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

function pokemonFull(name){
    return new Promise((resolve, reject) => {
        name = name.toLowerCase();
        P.getPokemonSpeciesByName(name).then(function(data){
            console.log(data);
            title = firstLetterUp(data.forms[0].name) + ' National dex: ' + data.id;
            description =
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
        })
        .catch(function(err){
            console.log(err);
        })
    });
}

function firstLetterUp(string){
    return string.substring(0,1).toUpperCase() + string.substring(1);
}
module.exports = { pokemon, pokemonFull }