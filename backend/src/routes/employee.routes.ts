import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { createEmployee } from "../controllers/employee.controller";

const router = Router()

router.route('/create').post(verifyJWT,createEmployee)

export default router