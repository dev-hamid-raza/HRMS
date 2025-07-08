import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { punchTime } from "../controllers/attendance.controller.js";


const router = Router()

router.route('/punch').post(verifyJWT,punchTime)

export default  router