function converter(numero, base, baseDestino) {
    return new Promise((resolve, reject) => {
        var numeroArray;
        if (base != baseDestino) {
            numeroArray = numero.match(/.{1}/g);
            if (base == 10) {
                //se a base for 10 não tem porque converter
                numeroDec = numero;
                if (baseDestino == 10) {
                    //vai que o cara tá meio retardado
                    resolve(numeroDec)
                } else {
                    resolve(decParaBaseFinal(numeroDec, baseDestino).replace(/ /gi, ''));
                }
            } else if (base > 10) {
                //Converte em uma string separando os algarismos por um espaço e depois converte as letras para números para poder realizar os calculos e depois disso transforma em decimal para no final transformar na base escolhida
                numero = numeroArray.join(' ');
                numero = converterCharParaNumero(numero);
                numeroArray = numero.split(' ');
                //O reverse é para inverter o array e ele começar pelo ultimo algarismo no calculo
                numeroDec = baseParaDec(numeroArray.reverse(), base);
                if (numeroDec == false) {
                    resolve(false);
                } else if (baseDestino == 10) {
                    resolve(numeroDec)
                } else {
                    resolve(decParaBaseFinal(numeroDec, baseDestino).replace(/ /gi, ''));
                }
            } else { //base < 10
                //Transforma em decimal para no final transformar na base escolhida
                //O reverse é para inverter o array e ele começar pelo ultimo algarismo no calculo
                numeroDec = baseParaDec(numeroArray.reverse(), base);
                if (numeroDec == false) {
                    resolve(false);
                } else if (baseDestino == 10) {
                    resolve(numeroDec)
                } else {
                    resolve(decParaBaseFinal(numeroDec, baseDestino).replace(/ /gi, ''));
                }
            }
        } else {
            resolve(numero);
        }
    });
}

function calcular(primeiroNumero, basePrimeiroNumero, operacao, segundoNumero, baseSegundoNumero, baseResultado) {
    return new Promise((resolve, reject) => {
        var numeroArray1, numeroArray2;
        //transforma os dois números em decimal
        numeroArray1 = primeiroNumero.match(/.{1}/g);
        numeroArray2 = segundoNumero.match(/.{1}/g);
        if (basePrimeiroNumero != 10) {
            primeiroNumero = numeroArray1.join(' ');
            primeiroNumero = converterCharParaNumero(primeiroNumero);
            numeroArray1 = primeiroNumero.split(' ');
            //O reverse é para inverter o array e ele começar pelo ultimo algarismo no calculo
            numeroDec1 = baseParaDec(numeroArray1.reverse(), basePrimeiroNumero);
            if (numeroDec1 == false) {
                resolve(false);
            } else {
                numeroDec1 = parseInt(numeroDec1);
            }
        } else {
            numeroDec1 = parseInt(primeiroNumero);
        }
        if (baseSegundoNumero != 10) {
            segundoNumero = numeroArray2.join(' ');
            segundoNumero = converterCharParaNumero(segundoNumero);
            numeroArray2 = segundoNumero.split(' ');
            //O reverse é para inverter o array e ele começar pelo ultimo algarismo no calculo
            numeroDec2 = baseParaDec(numeroArray2.reverse(), baseSegundoNumero);
            if (numeroDec2 == false) {
                resolve(false);
            } else {
                numeroDec2 = parseInt(numeroDec2);
            }
        } else {
            numeroDec2 = parseInt(segundoNumero);
        }
        var resultadoDec;
        switch (operacao) {
            case '+':
                resultadoDec = numeroDec1 + numeroDec2;
                break;
            case '-':
                resultadoDec = numeroDec1 - numeroDec2;
                break;
            case '*':
                resultadoDec = numeroDec1 * numeroDec2;
                break;
            case '/':
                resultadoDec = numeroDec1 / numeroDec2;
                break;
        }
        if (baseResultado == 10) {
            resolve(resultadoDec);
        } else {
            resolve(decParaBaseFinal(resultadoDec, baseResultado).replace(/ /gi, ''));
        }
    });
}

function baseParaDec(numeroArray, base) {
    base = parseInt(base);
    resultado = 0;
    numeroArray.forEach((element, key) => {
        if (element >= base) {
            //Se algum algarismo for maior ou igual a base tem algo errado
            return false;
        } else {
            //Vai somando pra depois mandar o resultado
            resultado += (element * Math.pow(base, key));
        }
    });
    return resultado;
}

function decParaBaseFinal(numero, baseDestino) {
    var numeroFinal = '';
    var numeroDividido = numero;
    while (numeroDividido >= baseDestino) {
        //Verifica qual o resto do número pela base de destino e soma no inicio do número final
        numeroFinal = converterNumeroParaChar(numeroDividido % baseDestino) + ' ' + numeroFinal;
        numeroDividido = Math.floor(numeroDividido / baseDestino);
    }
    //Quando ele sair do while ele ainda não terá preenchido o primeiro número (que seria o número que não é mais divisivel)
    numeroFinal = converterNumeroParaChar(numeroDividido) + ' ' + numeroFinal
    return numeroFinal;
}

function converterCharParaNumero(numero) {
    //Nome auto-explicativo
    numero = numero.replace(/A/gi, 10);
    numero = numero.replace(/B/gi, 11);
    numero = numero.replace(/C/gi, 12);
    numero = numero.replace(/D/gi, 13);
    numero = numero.replace(/E/gi, 14);
    numero = numero.replace(/F/gi, 15);
    numero = numero.replace(/G/gi, 16);
    numero = numero.replace(/H/gi, 17);
    numero = numero.replace(/I/gi, 18);
    numero = numero.replace(/J/gi, 19);
    numero = numero.replace(/K/gi, 20);
    numero = numero.replace(/L/gi, 21);
    numero = numero.replace(/M/gi, 22);
    numero = numero.replace(/N/gi, 23);
    numero = numero.replace(/O/gi, 24);
    numero = numero.replace(/P/gi, 25);
    numero = numero.replace(/Q/gi, 26);
    numero = numero.replace(/R/gi, 27);
    numero = numero.replace(/S/gi, 28);
    numero = numero.replace(/T/gi, 29);
    numero = numero.replace(/U/gi, 30);
    numero = numero.replace(/V/gi, 31);
    numero = numero.replace(/W/gi, 32);
    numero = numero.replace(/X/gi, 33);
    numero = numero.replace(/Y/gi, 34);
    numero = numero.replace(/Z/gi, 35);
    return numero;
}

function converterNumeroParaChar(numero) {
    //Nome auto-explicativo dnv. Deve ter um jeito melhor de fazer mas não estou afim agora
    var Chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    return Chars[numero];
}

module.exports = { converter, calcular }