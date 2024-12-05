import doctorsModel from "../models/doctorsModel.js";
import specialtiesModel from "../models/specialtiesModel.js";

const getDoctors = async (req, res) => {
    try {
        const doctors = await doctorsModel.getAllDoctors();
        res.render("doctors/index", { doctors });
    } catch (error) {
        console.error("Error al obtener doctores:", error);
        res.status(500).send("Error al obtener doctores");
    }
};

const showCreateForm = async (req, res) => {
    try {
        const specialties = await specialtiesModel.getAllSpecialties();
        res.render("doctors/form", { doctor: null, specialties });
    } catch (error) {
        console.error("Error al cargar el formulario:", error);
        res.status(500).send("Error al cargar el formulario");
    }
};

const createDoctor = async (req, res) => {
    try {
        await doctorsModel.addDoctor(req.body);
        res.redirect("/doctors");
    } catch (error) {
        console.error("Error al agregar doctor:", error);
        res.status(500).send("Error al agregar doctor");
    }
};

const showEditForm = async (req, res) => {
    try {
        const doctor = await doctorsModel.getDoctorById(req.params.id);
        const specialties = await specialtiesModel.getAllSpecialties();
        if (!doctor) {
            return res.status(404).send("Doctor no encontrado");
        }
        res.render("doctors/form", { doctor, specialties });
    } catch (error) {
        console.error("Error al cargar el formulario de edición:", error);
        res.status(500).send("Error al cargar el formulario de edición");
    }
};

const editDoctor = async (req, res) => {
    try {
        await doctorsModel.updateDoctor(req.params.id, req.body);
        res.redirect("/doctors");
    } catch (error) {
        console.error("Error al actualizar doctor:", error);
        res.status(500).send("Error al actualizar doctor");
    }
};

const deleteDoctor = async (req, res) => {
    try {
        await doctorsModel.deleteDoctor(req.params.id);
        res.redirect("/doctors");
    } catch (error) {
        console.error("Error al eliminar doctor:", error);
        res.status(500).send("Error al eliminar doctor");
    }
};

export default { getDoctors, showCreateForm, createDoctor, showEditForm, editDoctor, deleteDoctor };
