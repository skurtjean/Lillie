const excel = require('excel4node');

function tabelaVerdade(variaveis, inverso) {
    return new Promise((resolve, reject) => {

        var workbook = new excel.Workbook();

        var worksheet = workbook.addWorksheet('Sheet 1');

        var style = workbook.createStyle({
            font: {
                size: 12
            }
        });

        var colunaInicioFuncoes = parseInt(variaveis) + 1;

        for (let i = 1; i <= variaveis; i++) {
            var value = 1;
            for (let j = 0; j < Math.pow(2, variaveis); j++) {
                if (j % Math.pow(2, (variaveis - i)) == 0) {
                    value = (value == 0 ? 1 : 0)
                }
                worksheet.cell((j + 1), i).number(value).style(style);
            }
        }

        if (inverso == 's') {
            for (let i = variaveis; i < (variaveis * 2); i++) {
                for (let j = 0; j < Math.pow(2, variaveis); j++) {
                    worksheet.cell((j + 1), (parseInt(i) + 1)).formula('IF(' + ((((parseInt(i) - parseInt(variaveis)) + 10).toString(36).toUpperCase()) + (j + 1)) + '=1,0,1)').style(style);
                }
            }
            colunaInicioFuncoes += parseInt(variaveis);
        }

        worksheet.cell(1, colunaInicioFuncoes).formula('IF(AND(A1=1,B1=1),1,0)').style(style);
        worksheet.cell(1, colunaInicioFuncoes + 1).formula('IF(OR(A1=1,B1=1),1,0)').style(style);

        agora = Date.now()
        path = './excelGerados/' + agora + '.xlsx';
        nome = agora + '.xlsx'
        workbook.write('./excelGerados/' + agora + '.xlsx');
        resolve(path);
    });
}

module.exports = { tabelaVerdade }