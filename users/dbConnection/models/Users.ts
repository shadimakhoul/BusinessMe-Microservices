import mongoose, { Schema } from 'mongoose'

interface UserModel extends mongoose.Document {
    username: string,
    email: string,
    password: string,
    accountType: boolean,
    created_at: Date,
    updated_at: Date,
}

const UserSchema: Schema<UserModel> = new mongoose.Schema<UserModel>({
    username: {
        type: String,
        unique: true, 
        lowercase: true
    },
    email: {
        type: String, 
        unique: true, 
        lowercase: true,
        validate: {
            validator: async function (value: String){
                const UserModel = mongoose.model<UserModel>('User', UserSchema); 
                if (value.length < 4){
                    return false
                }

                const user = await UserModel.findOne({email: value})
                if (user){
                    return false
                }
                return true
            }
        }
    },
    password: String,
    accountType: Boolean,
    created_at: Date,
    updated_at: Date,
}, {timestamps: true})

const UserModel = mongoose.model<UserModel>('User', UserSchema);

export default UserModel;