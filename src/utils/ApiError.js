class ApiError extends Error{
    constructor(
        statuscode,
        messsage="Something went wrong",
        errors=[],
        stack=""
    ){
        super(messsage)
        this.statuscode=statuscode
        this.data=null
        this.message=messsage
        this.success=false
        this.errors=errors;

        if(stack){
            this.stack=stack
        } else {
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}
