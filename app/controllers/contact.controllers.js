const mongoose = require('mongoose')
const { BadRequestError } = require("../errors")
const handlePromise = require('../helpers/promise.helper')
const Contact = require('../models/contact.model')

class ContactBook{
    async create(req,res,next){
        if(!req.body.name){
            return next(new BadRequestError(400, "Name can not be empty"))           
        }
        const contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            favorite: req.body.favorite === true,
        })

        // const contact = new Contact({
        //     name: "Phuoc Thang",
        //     email: "Thang@gmail.com",
        //     address: "Nui Sap",
        //     phone: "0123654987",
        //     favorite: req.body.favorite === true,
        // })

        const [error, document] = await handlePromise(contact.save())
        if(error){
            return next(new BadRequestError(500,
                "An error occurred while creating the contact"))
        }
        return res.send(document)
    }


    async findAll(req,res,next){
        const condition = { }
        const { name } = req.query
        if(name){
            condition.name = { $regex: new RegExp(name), $options: "i"}
        }

        const [error,documents] = await handlePromise(Contact.find(condition))
        if(error){
            return next(new BadRequestError(500,
                "An error occurred while retrieving contacts"))
        }
        return res.send(documents)
    }


    async findOne(req,res,next){
        const { id } = req.params
        const condition = {
            _id: id && mongoose.isValidObjectId(id) ? id:null,
        }

        const [error,document] = await handlePromise(Contact.findOne(condition))

        if(error){
            return next(new BadRequestError(500,
                `Error retrieving contact with id=${req.params.id}`))
        }
        if(!document){
            return next(new BadRequestError(404, "Contact not Found"))
        }
        return res.send(document)
    }



    async update(req,res,next){
        if(Object.keys(req.body).length === 0){
            console.log(req.body)
            return next(new BadRequestError(400,
                "Data to update can to be empty"))
        }
        const { id } = req.params
        const condition = {
            _id: id && mongoose.isValidObjectId(id) ? id : null,
        }

        const [error, document] = await handlePromise(
            Contact.findOneAndUpdate(condition, req.body, {
                new: true,
            })
        )

        if(error) {
            return next(new BadRequestError(500,
                `Error updating contact with id=${req.params.id}`))
        }

        if(!document){
            return next(new BadRequestError(404, "Contact not Found"))
        }

        return res.send({ massage: "Contact was update successfully",})
    }


    async delete(req,res,next){
        const { id } = req.params
        const condition = {
            _id:id && mongoose.isValidObjectId(id) ? id:null,
        }

        const [error, document] = await handlePromise(
            Contact.findOneAndDelete(condition)
        )

        if(error){
            return next(new BadRequestError(500,
                `Could not delete contact with id=${req.params.id}`))
        }

        if(!document){
            return next(new BadRequestError(404, "Contact not Found"))
        }
        return res.send({message: "Contact was delete successfully", })
    }


    async findAllFavorite(req,res,next){
        const [error, documents] = await handlePromise(
            Contact.find({ favorite: true, })
        )

        if(error){
            return next(new BadRequestError(500,
                "An error occurred while retrieving favorite contacts"))
        }

        return res.send(documents)
    }

    
    async deleteAll(req,res,next){
        const [error, data] = await handlePromise(
            Contact.deleteMany({ })
        )

        if (error){
            return next( new BadRequestError(500,
                "An error occurred while removing all contacts"))
        }
        return res.send({
            massage: `${data.deletedCount} contacts were deleted successfully`,
        })
    }    
}

module.exports = new ContactBook