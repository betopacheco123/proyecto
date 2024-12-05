import db from "../../db/database.js";

const getAllMedicalAreas = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM medical_areas", [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

const getMedicalAreaById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM medical_areas WHERE id = ?", [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const addMedicalArea = (medicalArea) => {
    return new Promise((resolve, reject) => {
        const { name, description } = medicalArea;
        db.run(
            "INSERT INTO medical_areas (name, description) VALUES (?, ?)",
            [name, description],
            function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
};

const updateMedicalArea = (id, medicalArea) => {
    return new Promise((resolve, reject) => {
        const { name, description } = medicalArea;
        db.run(
            "UPDATE medical_areas SET name = ?, description = ? WHERE id = ?",
            [name, description, id],
            function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            }
        );
    });
};

const deleteMedicalArea = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM medical_areas WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
};

export default { getAllMedicalAreas, getMedicalAreaById, addMedicalArea, updateMedicalArea, deleteMedicalArea };
