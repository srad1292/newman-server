CREATE TABLE patient
(
  patient serial NOT NULL,
  first_name text,
  last_name text,
  created_on timestamp default now(),
  PRIMARY KEY (patient)
);


CREATE TABLE doctor
(
  doctor serial NOT NULL,
  first_name text,
  last_name text,
  created_on timestamp default now(),
  PRIMARY KEY (doctor)
);

CREATE TABLE visit
(
  visit serial not null,
  patient integer not null,
  doctor integer NOT NULL,
  check_in timestamp,
  check_out timestamp,
  created_on timestamp default now(),
  PRIMARY KEY (visit),
  CONSTRAINT visit_patient_fkey FOREIGN KEY (patient)
      REFERENCES patient (patient) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO action,
  CONSTRAINT visit_doctor_fkey FOREIGN KEY (doctor)
      REFERENCES doctor (doctor) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

create table duration_period
(
	id integer not null,
	name text not null,
	primary key(id)
);

create table symptom
(
	symptom serial not null,
	name text not null,
	visit integer not null,
	duration_count integer not null,
	duration_period integer not null,
	created_on timestamp default now(),
	primary key(symptom),
	CONSTRAINT symptom_duration_fkey FOREIGN KEY (duration_count)
      REFERENCES duration_period (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO action,
    CONSTRAINT symptom_visit_fkey FOREIGN KEY (visit)
      REFERENCES visit (visit) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
