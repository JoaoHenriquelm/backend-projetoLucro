import { Router } from "express";
import TokenController from "../controllers/TokenController";
const router = new Router()

router.post('/', TokenController.store)
router.get('/', TokenController.verify)
router.delete('/', TokenController.delete)

export default router