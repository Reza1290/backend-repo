import express from 'express'
import dotenv from 'dotenv'
import userRouter from '../routes/userRoutes'
import { authMiddleware } from '../middleware/authMiddleware'
import { signJwt } from '../controller/api'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ status: true, message: 'This is Rest Api for ebuddy ' })
})

app.use('/api', authMiddleware, userRouter)
app.get('/sign-jwt', signJwt)

app.listen(port, () => {
  console.log(`Running port; ${port}`)
})

export default app