import { InterfaceUser } from '../../shared/logic/userInterface';

export interface User extends Omit<InterfaceUser, 'name' | 'email' | 'password'> {}
