import { User } from "../../global-interfaces/user";
import { UserModel } from "../models/index"

function createUser(user: User) {
    const newUser = new UserModel(user)       
    return newUser.save()
} 

function getUsers() {
    return UserModel.find()
}

function getUser(id: string) {
    return UserModel.findById(id)
}

export {
    createUser,
    getUsers, 
    getUser,
}