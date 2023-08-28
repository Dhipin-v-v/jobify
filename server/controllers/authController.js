import User from '../models/User.js'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

// Adding a new user to Database
const register = async (req, res, next) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all values')
  }
  const userAlreadyExist = await User.findOne({ email })
  if (userAlreadyExist) {
    throw new BadRequestError('User already exists')
  }
  const user = await User.create({ name, email, password })
  const token = user.createJWT()
  res.status(201).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new UnAuthenticatedError('No user found')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Wrong password')
  }
  const token = user.createJWT()
  user.password = undefined
  res.status(200).json({ user, token, location: user.location })
}

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await User.findOne({ _id: req.user.userId })
  user.email = email
  user.name = name
  user.lastName = lastName
  user.location = location
  await user.save()
  const token = user.createJWT()
  res.status(200).json({ user, token, location: user.location })
}

export { register, login, updateUser }
