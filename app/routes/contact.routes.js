const express = require('express')
const contacts = require('../controllers/contact.controllers.js')


// function handler(){
    const router = express.Router()
    router.post('/' ,  contacts.create)
    router.get('/', contacts.findAll)
    router.get('/favorite', contacts.findAllFavorite)
    router.get('/:id', contacts.findOne)
    router.put('/:id', contacts.update)
    
    router.delete('/', contacts.deleteAll)
    router.delete('/:id', contacts.delete)
    
// }

function route(app){
    app.use('/api/contacts', router) 
}
module.exports = route