import express from "express";
import {
	auth,
	home,
	user,
	course
} from "./../controllers/index";
import {
	authValid,
	userValid,
	courseValid
} from './../validation/index'
import passport from 'passport'

import { imageUploadFile } from "../controllers/CourseController";



let router = express.Router();

/**
 * Init all routes
 * @param app from exacly  express module
 */

let initROutes = app => {


	// Course

 

	return app.use("/", router);
};

module.exports = initROutes;
