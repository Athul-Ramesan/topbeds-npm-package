export class customError extends Error {
     statusCode: number;
     status: string;
     
    constructor(message:string,statusCode:number){
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    }
}