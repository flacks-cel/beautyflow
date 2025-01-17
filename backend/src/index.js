// backend/src/index.js
const express = require('express');
const cors = require('cors');
const clientController = require('./controllers/clientController');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas de Clientes
app.get('/api/clients', clientController.getAll);
app.get('/api/clients/:id', clientController.getById);
app.post('/api/clients', clientController.create);
app.put('/api/clients/:id', clientController.update);
app.delete('/api/clients/:id', clientController.delete);

// Rota de teste
app.get('/', (req, res) => {
    res.json({ message: 'Backend do BeautyFlow está funcionando!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});