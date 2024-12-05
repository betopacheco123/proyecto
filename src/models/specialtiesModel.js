import db from "../../db/database.js";

const getAllSpecialties = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM specialties", [], (err, rows) => {
            if (err) {
                console.error("Error al obtener especialidades:", err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getSpecialtyById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM specialties WHERE id = ?", [id], (err, row) => {
            if (err) {
                console.error(`Error al obtener la especialidad con ID ${id}:`, err);
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

const addSpecialty = (specialty) => {
    return new Promise((resolve, reject) => {
        const { name } = specialty;
        db.run(
            "INSERT INTO specialties (name) VALUES (?)",
            [name],
            function (err) {
                if (err) {
                    console.error("Error al agregar especialidad:", err);
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            }
        );
    });
};

const updateSpecialty = (id, specialty) => {
    return new Promise((resolve, reject) => {
        const { name } = specialty;
        db.run(
            "UPDATE specialties SET name = ? WHERE id = ?",
            [name, id],
            function (err) {
                if (err) {
                    console.error(`Error al actualizar la especialidad con ID ${id}:`, err);
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            }
        );
    });
};

const deleteSpecialty = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM specialties WHERE id = ?", [id], function (err) {
            if (err) {
                console.error(`Error al eliminar la especialidad con ID ${id}:`, err);
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    });
};

export default { getAllSpecialties, getSpecialtyById, addSpecialty, updateSpecialty, deleteSpecialty };
