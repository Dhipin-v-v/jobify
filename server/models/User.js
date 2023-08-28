import mongoose, { mongo } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 2,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false,
    // If done this way, while querying, use findOne().select('+password')
  },
  lastName: {
    type: String,
    maxlength: 20,
    trim: true,
    default: 'lastName',
  },
  location: {
    type: String,
    maxlength: 20,
    trim: true,
    default: 'my city',
  },
})

UserSchema.pre('save', async function () {
  if(!this.isModified('password')) return
    this.password = await bcrypt.hash(this.password, 10)
  })

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}

UserSchema.methods.comparePassword = async function (enteredPassword) {
  const compare = await bcrypt.compare(enteredPassword, this.password)
  return compare
}

export default mongoose.model('User', UserSchema)
