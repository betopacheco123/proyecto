import db from "../../db/database.js";

const getAllPatients = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM patients", [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

const getPatientById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM patients WHERE id = ?", [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const addPatient = (patient) => {
    return new Promise((resolve, reject) => {
        const { name, email, phone } = patient;
        db.run(
            "INSERT INTO patients (name, email, phone) VALUES (?, ?, ?)",
            [name, email, phone],
            function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
};

const updatePatient = (id, patient) => {
    return new Promise((resolve, reject) => {
        const { name, email, phone } = patient;
        db.run(
            "UPDATE patients SET name = ?, email = ?, phone = ? WHERE id = ?",
            [name, email, phone, id],
            function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            }
        );
    });
};

const deletePatient = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM patients WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
};

export default { getAllPatients, getPatientById, addPatient, updatePatient, deletePatient };
