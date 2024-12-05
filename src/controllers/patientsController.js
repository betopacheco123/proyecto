import patientsModel from "../models/patientsModel.js";

const getPatients = async (req, res) => {
    try {
        const patients = await patientsModel.getAllPatients();
        res.render("patients/index", { patients });
    } catch (error) {
        console.error("Error al obtener pacientes:", error);
        res.status(500).send("Error al obtener pacientes");
    }
};

const createPatient = async (req, res) => {
    try {
        await patientsModel.addPatient(req.body);
        res.redirect("/patients");
    } catch (error) {
        console.error("Error al agregar paciente:", error);
        res.status(500).send("Error al agregar paciente");
    }
};

const showEditForm = async (req, res) => {
    try {
        const patient = await patientsModel.getPatientById(req.params.id);
        if (!patient) {
            return res.status(404).send("Paciente no encontrado");
        }
        res.render("patients/form", { patient });
    } catch (error) {
        console.error("Error al cargar el formulario de edición:", error);
        res.status(500).send("Error al cargar el formulario de edición");
    }
};

const editPatient = async (req, res) => {
    try {
        await patientsModel.updatePatient(req.params.id, req.body);
        res.redirect("/patients");
    } catch (error) {
        console.error("Error al actualizar paciente:", error);
        res.status(500).send("Error al actualizar paciente");
    }
};

const deletePatient = async (req, res) => {
    try {
        await patientsModel.deletePatient(req.params.id);
        res.redirect("/patients");
    } catch (error) {
        console.error("Error al eliminar paciente:", error);
        res.status(500).send("Error al eliminar paciente");
    }
};

export default { getPatients, createPatient, showEditForm, editPatient, deletePatient };
