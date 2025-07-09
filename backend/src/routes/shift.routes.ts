import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { shiftCreate } from "../controllers/shift.controller";


const router = Router()

router.route('/create').post(verifyJWT, shiftCreate)

export default router