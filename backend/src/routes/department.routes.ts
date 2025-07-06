import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { createDepartment, deleteDepartment, departmentList, updateDepartment } from "../controllers/department.controller";

const router = Router()

// Secure routes

router.route('/create').post(verifyJWT,createDepartment)
router.route('/update/:id').post(verifyJWT,updateDepartment)
router.route('/delete/:id').delete(verifyJWT,deleteDepartment)
router.route('/').get(verifyJWT,departmentList)

export default router