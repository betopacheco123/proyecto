import express from "express";
import doctorsController from "../controllers/doctorsController.js";

const router = express.Router();

router.get("/", doctorsController.getDoctors);
router.get("/create", doctorsController.showCreateForm);
router.post("/create", doctorsController.createDoctor);
router.get("/edit/:id", doctorsController.showEditForm);
router.post("/edit/:id", doctorsController.editDoctor);
router.get("/delete/:id", doctorsController.deleteDoctor);

export default router;
