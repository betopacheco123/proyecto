import medicalAreasModel from "../models/medicalAreasModel.js";

const getMedicalAreas = async (req, res) => {
    try {
        const medicalAreas = await medicalAreasModel.getAllMedicalAreas();
        res.render("medical_areas/index", { medicalAreas });
    } catch (error) {
        console.error("Error al obtener áreas médicas:", error);
        res.status(500).send("Error al obtener áreas médicas");
    }
};

const showCreateForm = (req, res) => {
    res.render("medical_areas/form", { medicalArea: null });
};

const createMedicalArea = async (req, res) => {
    try {
        await medicalAreasModel.addMedicalArea(req.body);
        res.redirect("/medical_areas");
    } catch (error) {
        console.error("Error al agregar área médica:", error);
        res.status(500).send("Error al agregar área médica");
    }
};

const showEditForm = async (req, res) => {
    try {
        const medicalArea = await medicalAreasModel.getMedicalAreaById(req.params.id);
        if (!medicalArea) {
            return res.status(404).send("Área médica no encontrada");
        }
        res.render("medical_areas/form", { medicalArea });
    } catch (error) {
        console.error("Error al cargar el formulario de edición:", error);
        res.status(500).send("Error al cargar el formulario de edición");
    }
};

const editMedicalArea = async (req, res) => {
    try {
        await medicalAreasModel.updateMedicalArea(req.params.id, req.body);
        res.redirect("/medical_areas");
    } catch (error) {
        console.error("Error al actualizar área médica:", error);
        res.status(500).send("Error al actualizar área médica");
    }
};

const deleteMedicalArea = async (req, res) => {
    try {
        await medicalAreasModel.deleteMedicalArea(req.params.id);
        res.redirect("/medical_areas");
    } catch (error) {
        console.error("Error al eliminar área médica:", error);
        res.status(500).send("Error al eliminar área médica");
    }
};

export default { getMedicalAreas, showCreateForm, createMedicalArea, showEditForm, editMedicalArea, deleteMedicalArea };
