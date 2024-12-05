import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";



import patientsRoutes from "./routes/patientsRoutes.js";
import doctorsRoutes from "./routes/doctorsRoutes.js";
import specialtiesRoutes from "./routes/specialtiesRoutes.js";
import appointmentsRoutes from "./routes/appointmentsRoutes.js";
import medicalAreasRoutes from "./routes/medicalAreasRoutes.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuración de EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// Rutas
app.use("/patients", patientsRoutes);
app.use("/doctors", doctorsRoutes);
app.use("/specialties", specialtiesRoutes);
app.use("/appointments", appointmentsRoutes);
app.use("/medical_areas", medicalAreasRoutes);


export default app;
