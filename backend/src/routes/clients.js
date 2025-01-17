const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Listar todos os clientes
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM clients ORDER BY name'
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
});

// Buscar cliente por ID
router.get('/:id', async (req, res) => {
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
        res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
});

// Criar novo cliente
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, birth_date } = req.body;
        
        const result = await pool.query(
            'INSERT INTO clients (name, email, phone, birth_date) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, phone, birth_date]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.constraint === 'clients_email_key') {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }
        res.status(500).json({ error: 'Erro ao criar cliente' });
    }
});

// Atualizar cliente
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
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
        if (err.constraint === 'clients_email_key') {
            return res.status(400).json({ error: 'Email já está em uso' });
        }
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
});

// Deletar cliente
router.delete('/:id', async (req, res) => {
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
        res.status(500).json({ error: 'Erro ao remover cliente' });
    }
});

module.exports = router;