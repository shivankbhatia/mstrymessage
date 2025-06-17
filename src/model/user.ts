// used to connect with MongoDB...
import mongoose, { Document, Schema } from "mongoose";
import { DocumentProps } from "next/document";

// typeScript code
export interface Message extends Document {
    content: string;
    createdAt: Date
}

// mongoose code
const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifycode: string;
    verifycodeexpiry: Date;
    isaccepting: boolean;
    isverified: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required!"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        match: [/^ [a - zA - Z0 -9._ % +-] + @[a - zA - Z0 - 9. -] +\.[a - zA - Z]{ 2, }$/
            , 'Please use a valid Email!'],
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    verifycode: {
        type: String,
        required: [true, "Verify Code is required!"]
    },
    verifycodeexpiry: {
        type: Date,
        required: [true, "Verify Code Expiry is required!"]
    },
    isverified: {
        type: Boolean,
        default: false
    },
    isaccepting: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;