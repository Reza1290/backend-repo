import { Request, Response } from 'express'
import { getUserById, getUsers, insertUser, updateUser } from '../repository/userCollection'
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

export const getUserDataById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const user = await getUserById(id)
        if (user) {
            res.status(200).json({ status: true, message: 'User fetched successfully', data: user })
        } else {
            res.status(404).json({ status: false, message: `User with ID ${id} not found` })
        }
    } catch (error) {
        res.status(500).json({ status: false, message: `Error fetching user: ${error}` })
    }
}

export const updateUserData = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const updates = req.body
    try {
        await updateUser(id, updates)
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

export const signJwt = async (req: Request, res: Response): Promise<void> => {
    const user = req.body;

    try {
        const token = jwt.sign({ email: user.email }, process.env.TOKEN_SECRET as string, { expiresIn: '1800s' });

        res.status(200).json({ status: true, message: 'Token generated successfully', token });
    } catch (error) {
        // console.error(`Error generating token: ${error}`);
        res.status(500).json({ status: false, message: `Error generating token: ${error}` });
    }
};
