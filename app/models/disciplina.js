var client = require('../../config/dbconnection.js');

module.exports = {
    listarDisciplinas,
    listarUmDisciplina,
    listarDisciplinas,
    alterarDisciplina,
    salvarDisciplina,
    listarProfessores,
    excluirDisciplina    
}

function listarDisciplinas (callback){
    //    client.query('SELECT * FROM ' + tabela, callback);
    client.query('select D.*, P.* from disciplina D INNER JOIN dados2182n.professor P ON D.pro_codigo = P.pro_codigo', callback);    
}

function listarUmDisciplina (id, callback){
    client.query('SELECT * FROM disciplina WHERE dis_codigo = ' + id, callback);
}


function listarProfessores (callback) {
    client.query('select * from professor order by pro_nome', callback);
}
function salvarDisciplina(dados, callback) {
    var msql = 'INSERT INTO disciplina SET ? ';

	client.query(msql, dados, callback);
}
function alterarDisciplina(dados, callback) {
	var msql = "UPDATE disciplina SET dis_nome = '" + dados.dis_nome +"' , dis_local = '" + dados.dis_local + "' , dis_aulas = '" + dados.dis_aulas + "' , dis_area = '" + dados.dis_area + "' , pro_codigo = '" + dados.pro_codigo + "'  WHERE dis_codigo = '" + dados.dis_codigo + "'";

    client.query(msql, callback);
}


function excluirDisciplina(id, callback){
    client.query('delete from disciplina where dis_codigo = ' + id, callback);
}


