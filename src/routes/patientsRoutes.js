import express from "express";
import patientsController from "../controllers/patientsController.js";

const router = express.Router();

// Listar pacientes
router.get("/", patientsController.getPatients);
router.post("/create", patientsController.createPatient);
router.get("/edit/:id", patientsController.showEditForm);
router.post("/edit/:id", patientsController.editPatient);
router.get("/delete/:id", patientsController.deletePatient);


export default router;
