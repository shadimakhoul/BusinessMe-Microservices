import { User } from "../../global-interfaces/user";
import { UserModel } from "../models/index"

async function createUser(user: User) {
    const newUser = new UserModel(user)

    console.log(newUser);
    
    return newUser.save()
} 

async function getUsers() {
    return await UserModel.find()
}

function getUser(id: string) {
    return UserModel.findById(id)
}

export {
    createUser,
    getUsers, 
    getUser,
}