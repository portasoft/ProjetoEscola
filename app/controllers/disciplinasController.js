var Disciplinas = require('../models/disciplina.js');

module.exports = {
    inicio,
    disciplinasInicio,
    disciplinasListar,
    disciplinasNovo,
    disciplinasSalvar,
    disciplinaBuscar,
    disciplinaExcluir

}

function inicio(req, res){
    res.render('../app/views/index.ejs', {title: 'Projeto Escola'});
}

function disciplinasInicio(req, res){
    res.render('../app/views/disciplinasInicio.ejs', {title: 'Menu Disciplina'});
}

function disciplinasListar(req, res){
    Disciplinas.listarDisciplinas(function (err, result){
        console.log("Resultado: ");
        if(err) {
            throw err;
        }
        res.render('../app/views/disciplinasListar.ejs', 
            {title: 'Novas Disciplinas',
            disciplinas: result});
    });
};


function disciplinaBuscar(req, res){
    var id = req.params.codigo;
    Disciplinas.listarUmDisciplina(id, function(err, result){
        if (err) {
            throw err;
        } else{
            Disciplinas.listarDisciplinas(function (err, result_disciplinas) {
                        if (err) {
                            throw err;
                        }else{
                            Disciplinas.listarProfessores(function (err, result_professores) {
                                if (err) {
                                    throw err;
                                }else{
                                res.render('../app/views/disciplinasEditar.ejs', 
                                {disciplina: result,
                                lista_disciplinas: result_disciplinas,
                                lista_professores: result_professores
                            });            
                        }
                    });            
                }
            });
        }
    });
}

function disciplinasNovo(req, res){
    var dados = [
        {
           dis_codigo: "",
           dis_nome: "",
           dis_local: "",
           dis_aulas: "",
           dis_area: "",
           pro_codigo: ""
        }
    ]; 
            Disciplinas.listarDisciplinas(function (err, result_disciplinas) {
                if (err) {
                    throw err;
                }else{
                    Disciplinas.listarProfessores(function (err, result_professores) {
                        if (err) {
                            throw err;
                        }else{
                        res.render('../app/views/disciplinasEditar.ejs', 
                        {disciplina: dados,
                        lista_disciplinas: result_disciplinas,
                        lista_professores: result_professores
                    });            
                }
            });            
        }
    });  

}

function disciplinasSalvar(req, res){
    var dados = req.body;
    console.log("Salvando Disciplina...");
    console.log(req.body);
    if(dados.dis_codigo == ""){
        dados.dis_codigo = null;
        console.log("Inserindo Disciplina...");
        Disciplinas.salvarDisciplina(dados, function (err, result) {
            if (err) {
                throw err;
            }
            res.redirect('/disciplinasListar');
        })
    }else{
        console.log("Alterando Disciplina...");
        Disciplinas.alterarDisciplina(dados, function (err, result) {
            if (err) {
                throw err;
            }
            res.redirect('/disciplinasListar');
        });
    }

}

function disciplinaExcluir(req, res){
    var id = req.params.codigo;

    Disciplinas.excluirDisciplina(id, function(err, result){
        if (err){
            console.log("Erro Verifique!!!");
            throw err;                        
        }
        res.redirect('/disciplinasListar');        
    });
}

