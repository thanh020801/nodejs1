const mongoose = require('mongoose')
const app = require('./app')
const config = require('./app/config')


const PORT = config.app.port
const URI = config.db.uri

mongoose.connect(URI)
    .then(() =>{
        console.log("Conecting to database")
        app.listen(PORT, ()=>{
            console.log("Server is running ", PORT)
        })
    })
    .catch((err)=>{
        console.error("err: ", err)
        process.exit()
    })



