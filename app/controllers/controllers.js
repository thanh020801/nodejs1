exports.create = async (req,res) =>{
    res.send({ massage: "create handler"})
}
exports.findAll = async (req,res) =>{
    res.send({ massage: "findAll handler"})
}
exports.findOne = async (req,res) =>{
    res.send({ massage: "findOne handler"})
}
exports.update = async (req,res) =>{
    res.send({ massage: "update handler"})
}
exports.delete = async (req,res) =>{
    res.send({ massage: "delete handler"})
}
exports.deleteAll = async (req,res) =>{
    res.send({ massage: "deleteAll handler"})
}

