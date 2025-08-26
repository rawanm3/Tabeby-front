// models/doctor-filter.ts
export interface DoctorFilter {
  specialty?: string;
  location?: string;
  name?: string;

  // من الـ sidebar
  titleProfessor?: boolean;
  titleLecturer?: boolean;
  titleConsultant?: boolean;
  titleSpecialist?: boolean;

  genderMale?: boolean;
  genderFemale?: boolean;

  fee?: string; // any | lt50 | 50-100 | 100-200 | 200-300 | gt300
}
