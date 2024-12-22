import { Request, Response, NextFunction } from 'express'
import { auth } from '../config/firebaseConfig'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        res.status(401).json({ status: false, message: 'Unauthorized' })
        return
    }

    try {

        const verifiedIdToken = await auth.verifyIdToken(token)

        if (verifiedIdToken) {
            return next()
        }

        res.status(403).json({ status: false, message: 'Forbidden' })
        return
    } catch (error) {
        res.status(500).json({ status: false, message: `Authentication error: ${error}` })
    }
}
