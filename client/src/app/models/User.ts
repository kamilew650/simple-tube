import { RoleEnum } from './RoleEnum';

export default class User {
    _id: string
    firstName: string
    lastName: string
    login: string
    role: RoleEnum
}