import express from 'express'
const router = express.Router()
import authenticateUser from '../middlewares/auth.js'
import {register, login, updateUser} from '../controllers/authController.js'

router.route('/register').post(register)
// router.route('/login').post(authenticateUser,login)
router.route('/login').post(login)
router.route('/updateUser').patch(authenticateUser, updateUser)
export default router