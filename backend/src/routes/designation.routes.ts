import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { createDesignation, deleteDesignation, designationList, updateDesignation } from "../controllers/designation.controller";

const router = Router()

// secure routes

router.route('/').get(verifyJWT,designationList)
router.route('/create').post(verifyJWT,createDesignation)
router.route('/delete/:id').delete(verifyJWT,deleteDesignation)
router.route('/update/:id').post(verifyJWT,updateDesignation)

export default router