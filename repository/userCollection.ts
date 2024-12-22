import { db } from '../config/firebaseConfig'
import { User } from '../entities/user'

const userCollection = 'USERS'


export const getUsers = async (): Promise<User[] | null> => {
    try {
        const userDocs = await db.collection(userCollection).get()

        if (userDocs.empty) {
            return null
        }
        const users: User[] = userDocs.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[]

        return users

    } catch (error) {
        console.error(error)
        throw error
    }
}

export const updateUser = async (user: Partial<User>): Promise<void> => {
    if (!user.id) {
        throw new Error('Invalid user ID');
    }

    try {
        const userDocRef = db.collection(userCollection).doc(user.id);
        const userDoc = await userDocRef.get();

        if (!userDoc.exists) {
            throw new Error('User does not exist');
        }

        if (user.email) {
            const checkEmail = await db.collection(userCollection).where('email', '==', user.email).get();
            const conflictUser = checkEmail.docs.find(doc => doc.id !== user.id);
            if (conflictUser) {
                throw new Error('User with that email already exists');
            }
        }

        await userDocRef.update(user);

    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};


export const insertUser = async (user: Partial<User>): Promise<void> => {
    try {
        const userColl = db.collection('USERS');

        if (user.email) {
            const emailQuery = await userColl
                .where('email', '==', user.email)
                .get();

            if (!emailQuery.empty) {
                throw new Error('Email already exists');
            }
        }


        await userColl.add(user);
    } catch (error) {
        console.error("Error inserting user:", error)
        throw error
    }
}

