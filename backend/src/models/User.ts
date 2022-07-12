import mongoose, { Model, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser {
  _id: Schema.Types.ObjectId
  name: string
  email: string
  password: string
}

interface IUserModel extends Model<IUser> {
  comparePassword: (
    password: string,
    receivedPassword: string
  ) => Promise<boolean>
  encryptPassword: (password: string) => Promise<string>
}

// Define Schema
const userSchema: Schema<IUser, IUserModel> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
})

// Hash password before save in DB
userSchema.statics.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

// Compare password
userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

export default mongoose.model<IUser, IUserModel>('User', userSchema)
