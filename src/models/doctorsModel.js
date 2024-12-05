import db from "../../db/database.js";

const getAllDoctors = () => {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT doctors.id, doctors.name, specialties.name AS specialty
            FROM doctors
            JOIN specialties ON doctors.specialty_id = specialties.id
            `,
            [],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
};

const getDoctorById = (id) => {
    return new Promise((resolve, reject) => {
        db.get(
            `
            SELECT doctors.id, doctors.name, doctors.specialty_id
            FROM doctors
            WHERE doctors.id = ?
            `,
            [id],
            (err, row) => {
                if (err) reject(err);
                else resolve(row);
            }
        );
    });
};

const addDoctor = (doctor) => {
    return new Promise((resolve, reject) => {
        const { name, specialty_id } = doctor;
        db.run(
            "INSERT INTO doctors (name, specialty_id) VALUES (?, ?)",
            [name, specialty_id],
            function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
};

const updateDoctor = (id, doctor) => {
    return new Promise((resolve, reject) => {
        const { name, specialty_id } = doctor;
        db.run(
            "UPDATE doctors SET name = ?, specialty_id = ? WHERE id = ?",
            [name, specialty_id, id],
            function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            }
        );
    });
};

const deleteDoctor = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM doctors WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
};

export default { getAllDoctors, getDoctorById, addDoctor, updateDoctor, deleteDoctor };
