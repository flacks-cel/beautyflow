const Client = require('../models/Client');
const pool = require('../config/database');

const clientController = {
    async getAll(req, res) {
        try {
            const result = await pool.query(
                'SELECT * FROM clients ORDER BY name'
            );
            res.json(result.rows);
        } catch (err) {
            console.error('Erro ao buscar clientes:', err);
            res.status(500).json({ error: 'Erro ao buscar clientes' });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const result = await pool.query(
                'SELECT * FROM clients WHERE id = $1',
                [id]
            );
            
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }
            
            res.json(result.rows[0]);
        } catch (err) {
            console.error('Erro ao buscar cliente:', err);
            res.status(500).json({ error: 'Erro ao buscar cliente' });
        }
    },

    async create(req, res) {
        try {
            const errors = Client.validate(req.body);
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            const { name, email, phone, birth_date } = req.body;
            
            const result = await pool.query(
                'INSERT INTO clients (name, email, phone, birth_date) VALUES ($1, $2, $3, $4) RETURNING *',
                [name, email, phone, birth_date]
            );
            
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error('Erro ao criar cliente:', err);
            if (err.constraint === 'clients_email_key') {
                return res.status(400).json({ error: 'Email já cadastrado' });
            }
            res.status(500).json({ error: 'Erro ao criar cliente' });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const errors = Client.validate(req.body);
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            const { name, email, phone, birth_date } = req.body;
            
            const result = await pool.query(
                `UPDATE clients 
                 SET name = $1, email = $2, phone = $3, birth_date = $4, updated_at = CURRENT_TIMESTAMP
                 WHERE id = $5 RETURNING *`,
                [name, email, phone, birth_date, id]
            );
            
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }
            
            res.json(result.rows[0]);
        } catch (err) {
            console.error('Erro ao atualizar cliente:', err);
            if (err.constraint === 'clients_email_key') {
                return res.status(400).json({ error: 'Email já está em uso' });
            }
            res.status(500).json({ error: 'Erro ao atualizar cliente' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await pool.query(
                'DELETE FROM clients WHERE id = $1 RETURNING *',
                [id]
            );
            
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }
            
            res.json({ message: 'Cliente removido com sucesso' });
        } catch (err) {
            console.error('Erro ao remover cliente:', err);
            if (err.code === '23503') { // foreign key violation
                return res.status(400).json({ error: 'Não é possível remover o cliente pois existem registros vinculados' });
            }
            res.status(500).json({ error: 'Erro ao remover cliente' });
        }
    }
};

module.exports = clientController;