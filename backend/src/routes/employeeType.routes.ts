import { Router } from "express";
import {
    createEmpType,
    deleteEmpType,
    empTypeList,
    updateEmpType } from "../controllers/employeeType.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/').get(verifyJWT, empTypeList)
router.route('/create').post(verifyJWT, createEmpType)
router.route('/delete/:id').delete(verifyJWT, deleteEmpType)
router.route('/update/:id').post(verifyJWT, updateEmpType)

export default router