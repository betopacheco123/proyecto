import appointmentsModel from "../models/appointmentsModel.js";
import patientsModel from "../models/patientsModel.js";
import doctorsModel from "../models/doctorsModel.js";

const getAppointments = async (req, res) => {
    try {
        const appointments = await appointmentsModel.getAllAppointments();
        res.render("appointments/index", { appointments });
    } catch (error) {
        console.error("Error al obtener citas médicas:", error);
        res.status(500).send("Error al obtener citas médicas");
    }
};

const showCreateForm = async (req, res) => {
    try {
        const patients = await patientsModel.getAllPatients();
        const doctors = await doctorsModel.getAllDoctors();
        res.render("appointments/form", { appointment: null, patients, doctors });
    } catch (error) {
        console.error("Error al cargar el formulario de creación:", error);
        res.status(500).send("Error al cargar el formulario de creación");
    }
};

const createAppointment = async (req, res) => {
    try {
        await appointmentsModel.addAppointment(req.body);
        res.redirect("/appointments");
    } catch (error) {
        console.error("Error al agregar cita médica:", error);
        res.status(500).send("Error al agregar cita médica");
    }
};

const showEditForm = async (req, res) => {
    try {
        const appointment = await appointmentsModel.getAppointmentById(req.params.id);
        const patients = await patientsModel.getAllPatients();
        const doctors = await doctorsModel.getAllDoctors();
        if (!appointment) {
            return res.status(404).send("Cita médica no encontrada");
        }
        res.render("appointments/form", { appointment, patients, doctors });
    } catch (error) {
        console.error("Error al cargar el formulario de edición:", error);
        res.status(500).send("Error al cargar el formulario de edición");
    }
};

const editAppointment = async (req, res) => {
    try {
        await appointmentsModel.updateAppointment(req.params.id, req.body);
        res.redirect("/appointments");
    } catch (error) {
        console.error("Error al actualizar cita médica:", error);
        res.status(500).send("Error al actualizar cita médica");
    }
};

const deleteAppointment = async (req, res) => {
    try {
        await appointmentsModel.deleteAppointment(req.params.id);
        res.redirect("/appointments");
    } catch (error) {
        console.error("Error al eliminar cita médica:", error);
        res.status(500).send("Error al eliminar cita médica");
    }
};

export default { getAppointments, showCreateForm, createAppointment, showEditForm, editAppointment, deleteAppointment };
