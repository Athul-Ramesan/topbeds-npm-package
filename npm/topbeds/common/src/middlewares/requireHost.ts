import { NextFunction, Request, Response } from "express";

export const requireHost =(
    req:Request,
    res:Response,
    next:NextFunction
)=>{

    if(req.user?.role !== "host"){
        return res.status(401).json({
            status:"fail",
            message:"host access denied"
        })
    }
    next();
}