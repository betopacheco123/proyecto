import db from "../../db/database.js";

const getAllAppointments = () => {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT 
                appointments.id,
                patients.name AS patient_name,
                doctors.name AS doctor_name,
                appointments.appointment_date,
                appointments.notes
            FROM appointments
            JOIN patients ON appointments.patient_id = patients.id
            JOIN doctors ON appointments.doctor_id = doctors.id
            ORDER BY appointments.appointment_date
            `,
            [],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
};

const getAppointmentById = (id) => {
    return new Promise((resolve, reject) => {
        db.get(
            `
            SELECT * 
            FROM appointments 
            WHERE id = ?
            `,
            [id],
            (err, row) => {
                if (err) reject(err);
                else resolve(row);
            }
        );
    });
};

const addAppointment = (appointment) => {
    return new Promise((resolve, reject) => {
        const { patient_id, doctor_id, appointment_date, notes } = appointment;
        db.run(
            `
            INSERT INTO appointments (patient_id, doctor_id, appointment_date, notes) 
            VALUES (?, ?, ?, ?)
            `,
            [patient_id, doctor_id, appointment_date, notes],
            function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
};

const updateAppointment = (id, appointment) => {
    return new Promise((resolve, reject) => {
        const { patient_id, doctor_id, appointment_date, notes } = appointment;
        db.run(
            `
            UPDATE appointments 
            SET patient_id = ?, doctor_id = ?, appointment_date = ?, notes = ? 
            WHERE id = ?
            `,
            [patient_id, doctor_id, appointment_date, notes, id],
            function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            }
        );
    });
};

const deleteAppointment = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM appointments WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
};

export default { getAllAppointments, getAppointmentById, addAppointment, updateAppointment, deleteAppointment };
