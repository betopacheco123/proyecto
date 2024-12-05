import specialtiesModel from "../models/specialtiesModel.js";

const getSpecialties = async (req, res) => {
    try {
        const specialties = await specialtiesModel.getAllSpecialties();
        res.render("specialties/index", { specialties });
    } catch (error) {
        console.error("Error al obtener especialidades:", error);
        res.status(500).send("Error al obtener especialidades");
    }
};

const showCreateForm = (req, res) => {
    res.render("specialties/form", { specialty: null });
};

const createSpecialty = async (req, res) => {
    try {
        await specialtiesModel.addSpecialty(req.body);
        res.redirect("/specialties");
    } catch (error) {
        console.error("Error al agregar especialidad:", error);
        res.status(500).send("Error al agregar especialidad");
    }
};

const showEditForm = async (req, res) => {
    try {
        const specialty = await specialtiesModel.getSpecialtyById(req.params.id);
        if (!specialty) {
            return res.status(404).send("Especialidad no encontrada");
        }
        res.render("specialties/form", { specialty });
    } catch (error) {
        console.error("Error al cargar el formulario de edición:", error);
        res.status(500).send("Error al cargar el formulario de edición");
    }
};

const editSpecialty = async (req, res) => {
    try {
        await specialtiesModel.updateSpecialty(req.params.id, req.body);
        res.redirect("/specialties");
    } catch (error) {
        console.error("Error al actualizar especialidad:", error);
        res.status(500).send("Error al actualizar especialidad");
    }
};

const deleteSpecialty = async (req, res) => {
    try {
        await specialtiesModel.deleteSpecialty(req.params.id);
        res.redirect("/specialties");
    } catch (error) {
        console.error("Error al eliminar especialidad:", error);
        res.status(500).send("Error al eliminar especialidad");
    }
};

export default { getSpecialties, showCreateForm, createSpecialty, showEditForm, editSpecialty, deleteSpecialty };
