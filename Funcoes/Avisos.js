const fs = require('fs');
const pathAvisosGenshin = './jsons/avisosGenshin.json';
var avisosGenshin = JSON.parse(fs.readFileSync(pathAvisosGenshin));
const pathAvisosBangDream = './jsons/avisosBangDream.json';
var avisosBangDream = JSON.parse(fs.readFileSync(pathAvisosBangDream));
const pathAvisosHonkai = './jsons/avisosHonkai.json';
var avisosHonkai = JSON.parse(fs.readFileSync(pathAvisosHonkai));


// Cadastra aviso de resina do Genshin
function aviso_resina(args, id){
    return new Promise((resolve, reject) => {
        avisosGenshin = JSON.parse(fs.readFileSync(pathAvisosGenshin));
        data = new Date();
        data_full = + new Date(data.getTime() + (1000 * (120 - args[1]) * 480));
        data = + data;
        if(args.length == 2){
            informacoes = {
                "resina": parseInt(args[1]),
                "data": data,
                "data_full": data_full,
                "server": "NA",
                "id": id,
            }
        }
        else{
            informacoes = {
                "resina": parseInt(args[1]),
                "data": data,
                "data_full": data_full,
                "server": args[2],
                "id": id,
            }
        }
        pesquisa_aviso_genshin(informacoes.server, id, "cadastro").then(function(id_aviso){
            if(id_aviso.length == 0 || id_aviso == -1){
                avisosGenshin.push(informacoes);
                fs.writeFileSync(pathAvisosGenshin, JSON.stringify(avisosGenshin, null, 2));
                resolve("Aviso cadastrado com sucesso, caso queria ver quantas resinas tem a qualquer momento, utilize o comando !resina (!resina [servidor (só coloque se possui 2 contas e vai colocar 2 avisos)])");
            }
            else{
                avisosGenshin[id_aviso] = informacoes;
                fs.writeFileSync(pathAvisosGenshin, JSON.stringify(avisosGenshin, null, 2));
                resolve("Você já possuia um aviso cadastrado e ele agora foi atualizado, caso queria ver quantas resinas tem a qualquer momento, utilize o comando !resina (!resina [servidor (só coloque se possui 2 contas e vai colocar 2 avisos)])");
            }
        });
    });
}

// Pesquisa aviso de resina do Genshin
function pesquisa_aviso_genshin(server, id){
    return new Promise((resolve, reject) => {
        avisosGenshin = JSON.parse(fs.readFileSync(pathAvisosGenshin));
        aviso = avisosGenshin.findIndex(function(value){
            if(value.id == id && value.server == server){
                return true
            }
            else{
                return false;
            }
        });
        resolve(aviso);
    });
}

function resinas(args, id){
    return new Promise((resolve, reject) => {
        avisosGenshin = JSON.parse(fs.readFileSync(pathAvisosGenshin));
        var server = "NA";
        if(args.length == 2){
            server = args[1];
        }
        pesquisa_aviso_genshin(server, id).then(function(id_aviso){
            if(id_aviso.length == 0 || id_aviso == -1){
                resolve("Nenhum aviso cadastrado para você, para cadastrar utilize o comando !aviso-resina. (!aviso-resina {resina agora} [servidor (só coloque se possui 2 contas e vai colocar 2 avisos)])");
            }
            else{
                aviso = avisosGenshin[id_aviso];
                var resina = aviso.resina;
                var data_aviso = new Date(aviso.data);
                var data_agora = new Date();
                var data_full = new Date(aviso.data_full);
                resina += Math.floor( ( ( + data_agora - ( + data_aviso ) ) /1000 ) /480 );
                var data_resina = data_full.getTime() - data_agora.getTime();
                
                dia  = data_full.getDate().toString().padStart(2, '0');
                mes  = (data_full.getMonth()+1).toString().padStart(2, '0');
                ano  = data_full.getFullYear();
                hora = data_full.getHours().toString().padStart(2, '0')
                minuto = data_full.getMinutes().toString().padStart(2, '0')
                segundos = data_full.getSeconds().toString().padStart(2, '0')

                date_string = dia+"/"+mes+"/"+ano+" "+hora+":"+minuto+":"+segundos;

                var horas = Math.floor(data_resina/1000/60/60);
                data_resina -= horas*1000*60*60
                var minutos = Math.floor(data_resina/1000/60);
                data_resina -= minutos*1000*60
                var segundos = Math.floor(data_resina/1000);

                resolve("No momento você possui " + resina + " resinas, a sua resina maximizará termina de recarregar em " + horas + " horas " + minutos + " minutos " + segundos + " segundos (" + date_string + ")");
            }
        });
    });
}

// Remoção de aviso de resina do Genshin
function remove_aviso_genshin(args, id){
    return new Promise((resolve, reject) => {
        avisosGenshin = JSON.parse(fs.readFileSync(pathAvisosGenshin));
        var server = "NA";
        if(args.length == 2){
            server = args[1];
        }
        id_aviso = avisosGenshin.findIndex(function(value){
            if(value.id == id && value.server == server){
                return true
            }
            else{
                return false;
            }
        });
        if(id_aviso.length == 0 || id_aviso == -1){
            resolve("Nenhum aviso cadastrado para você, para cadastrar utilize o comando !aviso-resina. (!aviso-resina {resina agora} [servidor (só coloque se possui 2 contas e vai colocar 2 avisos)])");
        }
        else{
            avisosGenshin.splice(id_aviso, 1);
            fs.writeFileSync(pathAvisosGenshin, JSON.stringify(avisosGenshin, null, 2));
            resolve("Seu aviso foi excluido com sucesso!");
        }
    });
}



// Cadastra aviso de boosts do Bang Dream
function aviso_boosts(args, id){
    return new Promise((resolve, reject) => {
        avisosBangDream = JSON.parse(fs.readFileSync(pathAvisosBangDream));
        data = new Date();
        data_full = + new Date(data.getTime() + (1000 * (10 - args[1]) * 1800));
        data = + data;
        if(args.length == 2){
            informacoes = {
                "boosts": parseInt(args[1]),
                "data": data,
                "data_full": data_full,
                "server": "NA",
                "id": id,
            }
        }
        else{
            informacoes = {
                "boosts": parseInt(args[1]),
                "data": data,
                "data_full": data_full,
                "server": args[2],
                "id": id,
            }
        }
        pesquisa_aviso_bangdream(informacoes.server, id, "cadastro").then(function(id_aviso){
            if(id_aviso.length == 0 || id_aviso == -1){
                avisosBangDream.push(informacoes);
                fs.writeFileSync(pathAvisosBangDream, JSON.stringify(avisosBangDream, null, 2));
                resolve("Aviso cadastrado com sucesso, caso queria ver quantos boosts tem a qualquer momento, utilize o comando !boosts (!boosts [servidor (só coloque se possui 2 contas e vai colocar 2 avisos)])");
            }
            else{
                avisosBangDream[id_aviso] = informacoes;
                fs.writeFileSync(pathAvisosBangDream, JSON.stringify(avisosBangDream, null, 2));
                resolve("Você já possuia um aviso cadastrado e ele agora foi atualizado, caso queria ver quantos boosts tem a qualquer momento, utilize o comando !boosts (!boosts [servidor (só coloque se possui 2 contas e vai colocar 2 avisos)])");
            }
        });
    });
}

// Pesquisa aviso de boosts do Bang Dream
function pesquisa_aviso_bangdream(server, id){
    return new Promise((resolve, reject) => {
        avisosBangDream = JSON.parse(fs.readFileSync(pathAvisosBangDream));
        aviso = avisosBangDream.findIndex(function(value){
            if(value.id == id && value.server == server){
                return true
            }
            else{
                return false;
            }
        });
        resolve(aviso);
    });
}

function boosts(args, id){
    return new Promise((resolve, reject) => {
        avisosBangDream = JSON.parse(fs.readFileSync(pathAvisosBangDream));
        var server = "NA";
        if(args.length == 2){
            server = args[1];
        }
        pesquisa_aviso_bangdream(server, id).then(function(id_aviso){
            if(id_aviso.length == 0 || id_aviso == -1){
                resolve("Nenhum aviso cadastrado para você, para cadastrar utilize o comando !aviso-boosts. (!aviso-boosts {boosts agora} [servidor (só coloque se possui 2 contas e vai colocar 2 avisos)])");
            }
            else{
                aviso = avisosBangDream[id_aviso];
                var boosts = aviso.boosts;
                var data_aviso = new Date(aviso.data);
                var data_agora = new Date();
                var data_full = new Date(aviso.data_full);
                boosts += Math.floor( ( ( + data_agora - ( + data_aviso ) ) /1000 ) /1800 );
                var data_boosts = data_full.getTime() - data_agora.getTime();
                
                dia  = data_full.getDate().toString().padStart(2, '0');
                mes  = (data_full.getMonth()+1).toString().padStart(2, '0');
                ano  = data_full.getFullYear();
                hora = data_full.getHours().toString().padStart(2, '0')
                minuto = data_full.getMinutes().toString().padStart(2, '0')
                segundos = data_full.getSeconds().toString().padStart(2, '0')

                date_string = dia+"/"+mes+"/"+ano+" "+hora+":"+minuto+":"+segundos;

                var horas = Math.floor(data_boosts/1000/60/60);
                data_boosts -= horas*1000*60*60
                var minutos = Math.floor(data_boosts/1000/60);
                data_boosts -= minutos*1000*60
                var segundos = Math.floor(data_boosts/1000);

                resolve("No momento você possui " + boosts + " boosts, os seus boosts maximizarão em " + horas + " horas " + minutos + " minutos " + segundos + " segundos (" + date_string + ")");
            }
        });
    });
}

// Remoção de aviso de boosts do Bang Dream
function remove_aviso_bangdream(args, id){
    return new Promise((resolve, reject) => {
        avisosBangDream = JSON.parse(fs.readFileSync(pathAvisosBangDream));
        var server = "NA";
        if(args.length == 2){
            server = args[1];
        }
        id_aviso = avisosBangDream.findIndex(function(value){
            if(value.id == id && value.server == server){
                return true
            }
            else{
                return false;
            }
        });
        if(id_aviso.length == 0 || id_aviso == -1){
            resolve("Nenhum aviso cadastrado para você, para cadastrar utilize o comando !aviso-boosts. (!aviso-boosts {boosts agora} [servidor (só coloque se possui 2 contas e vai colocar 2 avisos)])");
        }
        else{
            avisosBangDream.splice(id_aviso, 1);
            fs.writeFileSync(pathAvisosBangDream, JSON.stringify(avisosBangDream, null, 2));
            resolve("Seu aviso foi excluido com sucesso!");
        }
    });
}


// Aviso de stamina do Honkai
function aviso_stamina(args, id){
    return new Promise((resolve, reject) => {
        avisosHonkai = JSON.parse(fs.readFileSync(pathAvisosHonkai));
        data = new Date();
        data_full = + new Date(data.getTime() + (1000 * (args[2] - args[1]) * 360));
        data = + data;
        if(args.length == 3){
            informacoes = {
                "stamina": parseInt(args[1]),
                "data": data,
                "data_full": data_full,
                "server": "NA",
                "id": id,
            }
        }
        else{
            informacoes = {
                "stamina": parseInt(args[1]),
                "data": data,
                "data_full": data_full,
                "server": args[2],
                "id": id,
            }
        }
        pesquisa_aviso_honkai(informacoes.server, id, "cadastro").then(function(id_aviso){
            if(id_aviso.length == 0 || id_aviso == -1){
                avisosHonkai.push(informacoes);
                fs.writeFileSync(pathAvisosHonkai, JSON.stringify(avisosHonkai, null, 2));
                resolve("Aviso cadastrado com sucesso, caso queria ver quanto de stamina possui tem a qualquer momento, utilize o comando !stamina (!stamina [servidor (só coloque se possui 2 contas e vai colocar 2 avisos)])");
            }
            else{
                avisosHonkai[id_aviso] = informacoes;
                fs.writeFileSync(pathAvisosHonkai, JSON.stringify(avisosHonkai, null, 2));
                resolve("Você já possuia um aviso cadastrado e ele agora foi atualizado, caso queria ver quanto de stamina possui tem a qualquer momento, utilize o comando !stamina (!stamina [servidor (só coloque se possui 2 contas e vai colocar 2 avisos)])");
            }
        });
    });
}

// Pesquisa aviso de stamina do Honkai
function pesquisa_aviso_honkai(server, id){
    return new Promise((resolve, reject) => {
        avisosHonkai = JSON.parse(fs.readFileSync(pathAvisosHonkai));
        aviso = avisosHonkai.findIndex(function(value){
            if(value.id == id && value.server == server){
                return true
            }
            else{
                return false;
            }
        });
        resolve(aviso);
    });
}

function stamina(args, id){
    return new Promise((resolve, reject) => {
        avisosHonkai = JSON.parse(fs.readFileSync(pathAvisosHonkai));
        var server = "NA";
        if(args.length == 2){
            server = args[1];
        }
        pesquisa_aviso_honkai(server, id).then(function(id_aviso){
            if(id_aviso.length == 0 || id_aviso == -1){
                resolve("Nenhum aviso cadastrado para você, para cadastrar utilize o comando !aviso-stamina. (!aviso-stamina {stamina agora} {stamina máxima} [servidor (só coloque se possui 2 contas e vai colocar 2 avisos)])");
            }
            else{
                aviso = avisosHonkai[id_aviso];
                var stamina = aviso.stamina;
                var data_aviso = new Date(aviso.data);
                var data_agora = new Date();
                var data_full = new Date(aviso.data_full);
                stamina += Math.floor( ( ( + data_agora - ( + data_aviso ) ) /1000 ) /360 );
                var data_stamina = data_full.getTime() - data_agora.getTime();
                
                dia  = data_full.getDate().toString().padStart(2, '0');
                mes  = (data_full.getMonth()+1).toString().padStart(2, '0');
                ano  = data_full.getFullYear();
                hora = data_full.getHours().toString().padStart(2, '0')
                minuto = data_full.getMinutes().toString().padStart(2, '0')
                segundos = data_full.getSeconds().toString().padStart(2, '0')

                date_string = dia+"/"+mes+"/"+ano+" "+hora+":"+minuto+":"+segundos;

                var horas = Math.floor(data_stamina/1000/60/60);
                data_stamina -= horas*1000*60*60
                var minutos = Math.floor(data_stamina/1000/60);
                data_stamina -= minutos*1000*60
                var segundos = Math.floor(data_stamina/1000);

                resolve("No momento você possui " + stamina + " stamina, a sua stamina maximizará em " + horas + " horas " + minutos + " minutos " + segundos + " segundos (" + date_string + ")");
            }
        });
    });
}

// Remoção de aviso de stamina do Honkai
function remove_aviso_honkai(args, id){
    return new Promise((resolve, reject) => {
        avisosHonkai = JSON.parse(fs.readFileSync(pathAvisosHonkai));
        var server = "NA";
        if(args.length == 2){
            server = args[1];
        }
        id_aviso = avisosHonkai.findIndex(function(value){
            if(value.id == id && value.server == server){
                return true
            }
            else{
                return false;
            }
        });
        if(id_aviso.length == 0 || id_aviso == -1){
            resolve("Nenhum aviso cadastrado para você, para cadastrar utilize o comando !aviso-stamina. (!aviso-stamina {stamina agora} {stamina máxima} [servidor (só coloque se possui 2 contas e vai colocar 2 avisos)])");
        }
        else{
            avisosHonkai.splice(id_aviso, 1);
            fs.writeFileSync(pathAvisosHonkai, JSON.stringify(avisosHonkai, null, 2));
            resolve("Seu aviso foi excluido com sucesso!");
        }
    });
}


module.exports = { aviso_resina, resinas, remove_aviso_genshin, aviso_boosts, boosts, remove_aviso_bangdream, aviso_stamina, stamina, remove_aviso_honkai }