import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getPunches, punchTime } from "../controllers/attendance.controller.js";


const router = Router()

router.route('/punch').post(verifyJWT,punchTime)
router.route('/get-punches').get(verifyJWT,getPunches)

export default  router