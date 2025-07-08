import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createEmployee } from "../controllers/employee.controller.js";

const router = Router()

router.route('/create').post(verifyJWT, createEmployee)

export default router