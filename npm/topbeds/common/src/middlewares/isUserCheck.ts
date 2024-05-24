import { NextFunction, Request, Response } from "express"
import jwt, { VerifyErrors } from "jsonwebtoken"
import { ObjectId } from "mongoose"


export interface IUserPayload {
    _id: string,
    email: string,
    role: string,
}
declare global {
    namespace Express {
        interface Request {
            user?: IUserPayload
        }
    }
}
export const isUserCheck = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const jwtAccessToken = req.cookies?.access_token
    console.log("🚀 ~ jwtAccessToken:", jwtAccessToken)

    if (jwtAccessToken) {
        try {
            const payload = jwt.verify(jwtAccessToken, process.env.ACCESS_TOKEN_SECRET!) as IUserPayload
            req.user = payload
            next()
        } catch (error: any) {
            if (error.name === "TokenExpiredError") {
                const jwtRefreshToken = req.cookies?.refresh_token

                if (!jwtRefreshToken) {
                    return res.status(401).json({
                        message: "Unauthorized"
                    })
                }
                try {
                    const payload = jwt.verify(jwtRefreshToken, process.env.REFRESH_TOKEN_SECRET as string) as IUserPayload

                    const newAccessToken = jwt.sign(jwt, String(process.env.ACCESS_TOKEN_SECRET),
                        { expiresIn: '24hr' })
                    res.cookie('access_token', newAccessToken, { httpOnly: true })
                    req.user = payload
                    next()
                } catch (error: any) {
                    return res.status(401).json({
                        message: "Unauthorized"
                    })
                }
            } else {
                return res.status(401).json({
                    message: "Unauthorized"
                })
            }
        }
    } else {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}

