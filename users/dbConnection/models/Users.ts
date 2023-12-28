import mongoose, { Schema } from 'mongoose'
import { accessStatuss, accessTypes } from '../../instance';
import { User } from '../../global-interfaces/user';


const UserSchema: Schema<User> = new Schema<User>({
    username: {
        type: String,
        unique: true, 
        lowercase: true,
        required: true,
    },
    email: {
        type: String, 
        lowercase: true,
        required: true,
        unique: true, 
        validate: {
            validator: async function (value: String){
                const re = /^\S+@\S+\.\S+$/;
                return re.test(String(value).toLowerCase());
            }
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true, 
        validate: {
            validator: async function (value: String){
                const re = /^\+\d{1,3}\d{3,14}$/;
                return re.test(String(value));
            }
        }
    },
    password: {type: String, required: true},
    salt: {type: String, required: true},
    accountType: {
        type: String,
        enum: Object.values(accessTypes),
        required: true,
        default: accessTypes.User
    },
    accountStatus: {
        type: String,
        enum: Object.values(accessStatuss),
        required: true,
        default: accessStatuss.Valid
    },
    lastLogin: Date,
    created_at: Date,
    updated_at: Date,
}, {timestamps: true})

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;