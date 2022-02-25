class BadRequestError extends Error{
    constructor(statusCode, message){
        super()
        this.statusCode = statusCode
        this.message = message
    }
}

class ErrorHandler{
    constructor(){
        this.ErrorHandler = (error , responStream = null) =>{
            if(responStream){
                responStream.status(error.statusCode || 500).json({
                    message: error.message || "Internal Server error",
                })
            }else{
                console.log(error)
            }
        }
    }
}


module.exports = {
    BadRequestError,
    errorHandler: new ErrorHandler(),
}