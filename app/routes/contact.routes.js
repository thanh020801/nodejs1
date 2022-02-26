const express = require('express')
const contacts = require('../controllers/contact.controllers.js')

function route(app){
    app.post('/' ,  contacts.create)
    app.get('/', contacts.findAll)
    app.get('/favorite', contacts.findAllFavorite)
    app.get('/:id', contacts.findOne)
    app.put('/:id', contacts.update)
    
    app.delete('/', contacts.deleteAll)
    app.delete('/:id', contacts.delete)
    // app.use('/api/contacts', app)
}

module.exports = route