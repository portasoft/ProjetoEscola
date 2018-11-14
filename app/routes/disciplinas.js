var controller = require('../controllers/disciplinasController.js');

app.get('/', controller.inicio);
app.get('/disciplinasInicio', controller.disciplinasInicio);
app.get('/disciplinasListar', controller.disciplinasListar);

app.get('/disciplina/views/novo', controller.disciplinasNovo);
app.post('/disciplina/salvar', controller.disciplinasSalvar);

app.get('/disciplina/views/:codigo', controller.disciplinaBuscar);
app.get('/disciplina/excluir/:codigo', controller.disciplinaExcluir);



