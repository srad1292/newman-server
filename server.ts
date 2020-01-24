import App from "./app";
import DoctorController from "./src/doctor/doctor.controller";
import PatientController from "./src/patient/patient.controller";
import SymptomController from "./src/symptom/symptom.controller";
import VisitController from "./src/visit/visit.controller";
import * as knex from './knex';

const db = knex['default'];

const app = new App(
  [
    new DoctorController(db),
    new PatientController(db),
    new SymptomController(db),
    new VisitController(db)
  ],
  4200,
);

app.listen();