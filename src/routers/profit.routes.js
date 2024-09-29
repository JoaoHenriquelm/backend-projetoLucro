import { Router } from "express";
import ProfitController from '../controllers/ProfitController'
import loginRequired from "../middlewares/loginRequired";
const router = new Router()

router.post('/', loginRequired, ProfitController.store)
router.get('/', loginRequired,  ProfitController.index)
router.get('/:id', loginRequired, ProfitController.show)
router.delete('/:id', loginRequired, ProfitController.delete)
router.put('/:id', loginRequired, ProfitController.update)

export default router