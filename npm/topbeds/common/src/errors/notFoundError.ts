
export class NotFoundError extends Error {  //inheriting the Error object of express
    statusCode: number;
    constructor(){
        super("Resource not found");  //calling the parent Error object constructor and passing the message into it
        this.statusCode = 404;  
        this.name= 'NotFoundError'
    }
}