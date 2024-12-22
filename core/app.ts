import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from '../routes/userRoutes'
import { authMiddleware } from '../middleware/authMiddleware'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors())  
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ status: true, message: 'This is Rest Api for ebuddy' })
})

app.use('/api', authMiddleware, userRouter)

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})

export default app
