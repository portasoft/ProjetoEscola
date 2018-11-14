var controller = require('../controllers/professoresController.js');

app.get('/', controller.inicio);
app.get('/professoresInicio', controller.professoresInicio);
app.get('/professoresListar', controller.professoresListar);

app.get('/professor/views/novo', controller.professoresNovo);
app.post('/professor/salvar', controller.professoresSalvar);

app.get('/professor/views/:codigo', controller.professorBuscar);
app.get('/professor/excluir/:codigo', controller.professorExcluir);



