import { db } from '../config/firebaseConfig'
import { User } from '../entities/user'
import {
    collection,
    doc,
    getDoc,
    updateDoc,
    getDocs,
    addDoc,
    where,
    query,
} from 'firebase/firestore'


const userCollection = collection(db, 'USERS');


export const getUserById = async (id: string): Promise<User | null> => {
    try {
        const userDoc = await getDoc(doc(db, 'USERS', id))

        if (!userDoc.exists()) {
            return null
        }
        return { id: userDoc.id, ...userDoc.data() } as User
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const getUsers = async (): Promise<User[] | null> => {
    try {
        const userDocs = await getDocs(userCollection)

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

export const updateUser = async (id: string, user: Partial<User>): Promise<void> => {
    try {
        const userCollection = collection(db, 'USERS')
        const q = query(userCollection, where('email', '==', user.email))
        const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) { throw new Error('Email already exists') }
        await updateDoc(doc(db, "USERS", id), user)
    } catch (error) {
        console.error("Error update users", error)
        throw error
    }
};

export const insertUser = async (user: Partial<User>): Promise<void> => {
    try {
        const userCollection = collection(db, 'USERS')
        const q = query(userCollection, where('email', '==', user.email))
        const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) { throw new Error('Email already exists') }
        await addDoc(userCollection, user)
    } catch (error) {
        console.error("Error insert users", error)
        throw error
    }
}

