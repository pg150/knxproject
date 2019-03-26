const express = require('express');

module.exports = (app) => {
    //appel du controller
    var todo = require('./controllers/todoController');
    app.get('/todo', todo.findAll);
    app.post('/todo/create', todo.add);
    app.get('/todo/delete/:id', todo.delete);
    app.post('/todo/update/:id', todo.update);
    
    // Si on appelle une autre route qui n'est pas définie au dessus on charge le fichier suivant : index.html
    app.get('*', (req, res) => {
       res.sendFile('public/index.html')
    });
}