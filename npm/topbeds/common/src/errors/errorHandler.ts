import { NextFunction, Request, Response } from "express";
//general error handling 
export const errorHandler = (
    err:any,
    req:Request,
    res:Response,
    next:NextFunction
)=>{

    const statusCode = err.statusCode || 500
    console.log("🚀 ~ error  in general error handling:", err)

    
    return res.status(statusCode).json({
        status: err.status,
        message:err.message
    })
}
