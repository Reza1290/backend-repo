import express from 'express'
import { getUsersData, insertDummyData, updateUserData } from '../controller/api'
const userRouter = express.Router()


userRouter.post('/update-user-data', updateUserData)
userRouter.get('/fetch-user-data', getUsersData)
userRouter.get('/insert-dummy', insertDummyData)

export default userRouter