var Professores = require('../models/professor.js');

module.exports = {
    inicio,
    professoresInicio,
    professoresListar,
    professoresNovo,
    professoresSalvar,
    professorBuscar,
    professorExcluir

}

function inicio(req, res){
    res.render('../app/views/index.ejs', {title: 'Projeto Escola'});
}

function professoresInicio(req, res){
    res.render('../app/views/professoresInicio.ejs', {title: 'Menu Professor'});
}

function professoresListar(req, res){
    Professores.listarProfessores(function (err, result){
        console.log("Resultado: ");
        if(err) {
            throw err;
        }
        res.render('../app/views/professoresListar.ejs', 
            {title: 'Novos Professores',
             professores: result});
    });
};


function professorBuscar(req, res){
    var id = req.params.codigo;
    Professores.listarUmProfessor(id, function(err, result){
        if (err) {
            throw err;
        } else{
            Professores.listarDisciplinas(function (err, result_disciplinas) {
                        if (err) {
                            throw err;
                        }else{
                            res.render('../app/views/professoresEditar.ejs', 
                                {professor: result,
                                lista_disciplinas: result_disciplinas
                            });            
                        }
                    });            
                }
           
        });
    }


function professoresNovo(req, res){
    var dados = [
        {
            pro_codigo: "",
            pro_nome: "",
            pro_apelido: "",
            pro_formacao: "",
            pro_cpf: "",
            pro_celular: "",
            pro_anonascimento: ""
        }
    ];

   
            Professores.listarDisciplinas(function (err, result_disciplinas) {
                if (err) {
                    throw err;
                }else{
                    res.render('../app/views/professoresEditar.ejs', 
                        {professor: dados,
                        lista_disciplinas: result_disciplinas
                    });            
                }
            });            
        }
   



function professoresSalvar(req, res){
    var dados = req.body;
    console.log("Salvando Professor...");
    console.log(req.body);
    if(dados.pro_codigo == ""){
        dados.pro_codigo = null;
        console.log("Inserindo Professor...");
        Professores.salvarProfessor(dados, function (err, result) {
            if (err) {
                throw err;
            }
            res.redirect('/professoresListar');
        })
    }else{
        console.log("Alterando Professor...");
        Professores.alterarProfessor(dados, function (err, result) {
            if (err) {
                throw err;
            }
            res.redirect('/professoresListar');
        });
    }

}

function professorExcluir(req, res){
    var id = req.params.codigo;

    Professores.excluirProfessor(id, function(err, result){
        if (err){
            console.log("Erro Verifique!!!");
            throw err;                        
        }
        res.redirect('/professoresListar');        
    });
}

