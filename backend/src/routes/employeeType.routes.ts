import { Router } from "express";
import { createEmpType } from "../controllers/employeeType.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router()

router.route('/create').post(verifyJWT, createEmpType)

export default router