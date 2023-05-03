// Configuração inicial
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express(); // Inicializa

// Forma de ler JSON // middlewares (São recursos que são executados entre req / res)
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Rotas da API
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

// Rota inicial / endpoint
// Aqui esta: Possibilidade de ler tudo o que vem na requisição e utilizar um resposta (Comunicar de volta)
app.get('/', (req, res) => {

    // Mostrar req

    // Resposta vai ser um JSON
    res.json({ message: 'oi Express!'});
});

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster.q5uxarn.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log("Conectamos ao banco de dados!");
        app.listen(3000); // Entregar uma porta
    }

    )
    .catch((err) => console.log(err));

