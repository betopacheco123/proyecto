import express from "express";
import specialtiesController from "../controllers/specialtiesController.js";

const router = express.Router();

// Listar especialidades
router.get("/", specialtiesController.getSpecialties);
router.get("/create", specialtiesController.showCreateForm);
router.post("/create", specialtiesController.createSpecialty);
router.get("/edit/:id", specialtiesController.showEditForm);
router.post("/edit/:id", specialtiesController.editSpecialty);
router.get("/delete/:id", specialtiesController.deleteSpecialty);

export default router;
