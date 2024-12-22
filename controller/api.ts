import { Request, Response } from 'express'
import { getUsers, insertUser, updateUser } from '../repository/userCollection'
import { User } from '../entities/user';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


const dummyUsers = [
    { name: 'John Doe', email: 'john.doe@example.com' },
];

export const getUsersData = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await getUsers()
        if (users) {
            res.status(200).json({ status: true, message: 'Users fetched successfully', data: users })
        } else {
            res.status(404).json({ status: false, message: 'No users found' })
        }
    } catch (error) {
        res.status(500).json({ status: false, message: `Error fetching users: ${error}` })
    }
}


export const updateUserData = async (req: Request, res: Response): Promise<void> => {
    const updates = req.body
    try {
        await updateUser(updates)
        res.status(200).json({ status: true, message: 'User updated successfully' })
    } catch (error) {
        res.status(500).json({ status: false, message: `Error updating user: ${error}` })
    }
}



export const insertDummyData = async (req: Request, res: Response): Promise<void> => {
    try {
        await insertUser(dummyUsers[0])
        res.status(200).json({ status: true, message: 'Dummy data inserted successfully' })
    } catch (error) {
        res.status(500).json({ status: false, message: `Error inserting dummy data: ${error}` })
    }
};


