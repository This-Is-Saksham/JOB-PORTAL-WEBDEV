import express from 'express'
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'

const router = express.Router()

router.route("/registerCompany").post(isAuthenticated, registerCompany)
router.route("/get").get(isAuthenticated, getCompany)
router.route("/get/:id").post(isAuthenticated, getCompanyById)
router.route("/update/:id").post(isAuthenticated, updateCompany)

export default router;