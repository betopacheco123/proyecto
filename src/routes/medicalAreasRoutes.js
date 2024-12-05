import express from "express";
import medicalAreasController from "../controllers/medicalAreasController.js";

const router = express.Router();


// Listar áreas médicas
router.get("/", medicalAreasController.getMedicalAreas);
router.get("/create", medicalAreasController.showCreateForm);
router.post("/create", medicalAreasController.createMedicalArea);
router.get("/edit/:id", medicalAreasController.showEditForm);
router.post("/edit/:id", medicalAreasController.editMedicalArea);
router.get("/delete/:id", medicalAreasController.deleteMedicalArea);



export default router;
