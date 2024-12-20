import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {
            res.status(401).json({ status: false, message: 'Unauthorized' })
            return
        }

        jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
            if (err) {
                res.status(403).json({ status: false, message: 'Forbidden' })
                return 
            }


            return next()
        })
    } catch (error) {
        res.status(500).json({ status: false, message: `Authentication error: ${error}` })
    }
}
