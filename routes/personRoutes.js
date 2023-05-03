const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// Rotas da API

// Create
router.post('/', async (req, res) => {

    // Tratar os dados que vem (do body)
    const {name, salary, approved} = req.body;
    // Exemplo: {name: "Matheus, salary: 5000, approve: false"}

    // Se não veio nome no body
    if (!name) {
        res.status(422).json({error: 'O nome é obrigatório!'});
        return;
    }

    // Cria um objeto com todos os objetos da requisição
    const person = {
        name,
        salary,
        approved
    }

    try{
        // criando dados
        await Person.create(person);
        res.status(201).json({message: 'Pessoa inserida.'}); // Dado criado com sucesso.
    } catch (error) {
        res.status(500).json({error: error});
    }

});

// Read - leitura de dados,
router.get('/', async (req, res) => {
    try {
        const people = await Person.find(); // Busca todos os dados
        res.status(200).json(people); // Manda como resposta todos os dados
    } catch (error) {
        res.status(500).json({error: error});
    }
});

router.get('/:id', async (req, res) => { //async (req, res)  Para esperar o banco de dados responder com a leitura

    // Extrair o dado da requisição, pela url = req.params
    const id = req.params.id;

    try {
        const person = await Person.findOne({_id: id}) // Encontrar o user que tem o _id igual ao id (No mongo DB é tratado como _id)

        if (!person) {
            res.status(422).json({message: 'A pessoa não foi encontrada!'});
            return;
        };

        res.status(200).json(person);

    } catch (error) {
        res.status(500).json({error: error});
    };
});

// Delete - deletar dados
router.delete('/:id', async (req, res) => { // /:id Vem pela URL

    const id = req.params.id;

    const person = await Person.findOne({_id: id}) // Encontrar o user que tem o _id igual ao id (No mongo DB é tratado como _id)

    if (!person) {
        res.status(422).json({message: 'A pessoa não foi encontrada!'});
        return;
    };

    try {
        await Person.deleteOne({_id: id});
        
        res.status(200).json({message: 'Usuário removido.'});

    } catch(error) {
        res.status(500).json({error: error});
    }
}); 

// Update - atualização de dados (PUT, PATCH)
router.patch('/:id', async(req, res) => {
    // Extrair o dado da requisição, pela url = req.params
    const id = req.params.id; 

    // Pega os dados
    const {name, salary, approved} = req.body;

    const person = {
        name,
        salary,
        approved,
    };

    try {
        const updatedPerson = await Person.updateOne({_id: id}, person);

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({message: 'A pessoa não foi encontrada!'});
            return;
        }

        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({error: error});
    }
})

module.exports = router;