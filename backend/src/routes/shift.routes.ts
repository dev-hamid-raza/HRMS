import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { deleteShift, shiftCreate, shiftList, updateShift } from "../controllers/shift.controller";


const router = Router()

router.route('/').get(verifyJWT, shiftList)
router.route('/create').post(verifyJWT, shiftCreate)
router.route('/delete/:id').delete(verifyJWT, deleteShift)
router.route('/update/:id').post(verifyJWT, updateShift)

export default router