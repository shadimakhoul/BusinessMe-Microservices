const { userModel } = require('../models')

async function createUser({username, email, password, accountType, created_at, updated_at}) {
    try {
        const user = new userModel({
            username, email, password, accountType, created_at, updated_at
        })
        const userResult = await user.save()
        return userResult;
    } catch (error) {
        console.log(error);
        // if (error.code == 11000){
        //     return {status: false, }
        // }else {

        // }
    }
} 

async function getUsers() {
    return await userModel.find()
}

function getUser(id) {
    return userModel.findById(id)
}

module.exports = {createUser,  getUsers, getUser, }