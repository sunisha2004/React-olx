import { Router } from "express";
 
import * as rh from './reqhandler.js'
import Auth from "./authentication/auth.js";

const router=Router();

router.route('/login').post(rh.login)
router.route('/register').post(rh.register)
router.route("/display").get(Auth,rh.display)
router.route('/verify').post(rh.verifyEmail)
router.route('/getuserData').get(Auth,rh.getUserData)
router.route('/adduserData').post(Auth,rh.addUserData)
router.route('/edituserData').put(Auth,rh.editUserData)
router.route('/deleteData').delete(Auth,rh.deleteUser)
router.route('/addPost').post(Auth,rh.addPost)
router.route('/getPosts').get(Auth, rh.getPosts)
router.route('/getPost/:id').get(Auth, rh.getPost)
router.route('/getAllPosts').get(Auth, rh.getAllPosts)
router.route('/updatePost/:id').put(Auth,rh.updatePost)
router.route('/deletePost/:id').delete(Auth, rh.deletePost)
router.route('/enqPost').post(Auth,rh.enqPost)










export default router