import express from 'express'
import { signin, signup } from '../controllers/user.js'

const routeruser = express.Router()

routeruser.post('/signin',signin)
routeruser.post('/signup',signup)

export default routeruser