import { Router } from "express";
 
import * as rh from './reqhandler.js'

const router=Router();

router.route('/login').post(rh.login)
router.route('/register').post(rh.register)

export default router