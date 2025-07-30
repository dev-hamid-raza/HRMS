import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createEmployee, employeesList } from "../controllers/employee.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route('/').get(verifyJWT, employeesList)
router.route('/create').post(verifyJWT,upload.single('image'), createEmployee)

export default router