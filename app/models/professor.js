var client = require('../../config/dbconnection.js');

module.exports = {
    listarProfessores,
    listarUmProfessor,
    listarDisciplinas,
    alterarProfessor,
    salvarProfessor,
    excluirProfessor    
}

function listarProfessores (callback){
    //    client.query('SELECT * FROM ' + tabela, callback);
    client.query('select * from professor', callback);    
}
function listarDisciplinas (callback){
    //    client.query('SELECT * FROM ' + tabela, callback);
    client.query('select * from disciplina', callback);    
}

function listarUmProfessor (id, callback){
    client.query('SELECT * FROM professor WHERE pro_codigo = ' + id, callback);
}



function listarDisciplinas (callback) {
    client.query('select * from disciplina order by dis_nome', callback);
}

function salvarProfessor(dados, callback) {
    var msql = 'INSERT INTO professor SET ? ';

	client.query(msql, dados, callback);
}
function alterarProfessor(dados, callback) {
	var msql = "UPDATE professor SET pro_nome = '" + dados.pro_nome +"' , pro_apelido = '" + dados.pro_apelido + "' , pro_formacao = '" + dados.pro_formacao + "' , pro_cpf = '" + dados.pro_cpf + "' , pro_celular = '" + dados.pro_celular + "' , pro_anonascimento = '" + dados.pro_anonascimento + "'  WHERE pro_codigo = '" + dados.pro_codigo + "'";

    client.query(msql, callback);
}


function excluirProfessor(id, callback){
    client.query('delete from professor where pro_codigo = ' + id, callback);
}


