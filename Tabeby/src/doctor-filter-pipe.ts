import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doctorFilter'
})
export class DoctorFilterPipe implements PipeTransform {

  transform(
    doctors: any[],
    name: string,
    specialty: string,
    city: string,
    maxPrice: number | null,
    titleProfessor?: boolean,
    titleLecturer?: boolean,
    titleConsultant?: boolean,
    titleSpecialist?: boolean,
    genderFemale?: boolean,
    genderMale?: boolean,
    acceptPromo?: boolean,
    fee?: string,
    availability?: string,
    entity?: string,
    role?: string
  ): any[] {
    if (!doctors) return [];

    // Title filter
  let titleFilters: string[] = [];
    if (titleProfessor) titleFilters.push('professor');
    if (titleLecturer) titleFilters.push('lecturer');
    if (titleConsultant) titleFilters.push('consultant');
    if (titleSpecialist) titleFilters.push('specialist');

    // Gender filter
  let genderFilters: string[] = [];
    if (genderFemale) genderFilters.push('female');
    if (genderMale) genderFilters.push('male');

  return doctors.filter(doc => {
      // Role filter (doctor/nurse)
      if (role && role !== 'any') {
        if (!doc.role || doc.role.toLowerCase() !== role.toLowerCase()) return false;
      }

      // Entity filter (hospital/clinic/center)
      if (entity && entity !== '') {
        if (!doc.entity || doc.entity.toLowerCase() !== entity.toLowerCase()) return false;
      }

      // Availability filter
      if (availability && availability !== 'any') {
        let label = '';
        if (availability === 'today') label = 'Today';
        else if (availability === 'tomorrow') label = 'Tomorrow';
        else if (availability === 'wed') label = 'Wed 08/20';
        const slot = doc.slots?.find((s: any) => s.label === label);
        if (!slot || !slot.times || !slot.times.some((t: any) => t.available)) return false;
      }
      // Name
      if (name && !(doc.name || '').toLowerCase().includes(name.toLowerCase())) return false;
      // Specialty
      if (specialty && (doc.specialty || '').toLowerCase() !== specialty.toLowerCase()) return false;
      // City
      if (city && !(doc.location || '').toLowerCase().includes(city.toLowerCase())) return false;
      // Max price
      if (maxPrice && doc.price > maxPrice) return false;

      // Title (دعم أكثر من كلمة مفتاحية)
      if (titleFilters.length > 0) {
        let found = false;
        for (let t of titleFilters) {
          if ((doc.title || '').toLowerCase().includes(t)) found = true;
        }
        if (!found) return false;
      }

      // Gender (يدعم غياب الحقل)
      if (genderFilters.length > 0) {
        if (!doc.gender || !genderFilters.includes((doc.gender || '').toLowerCase())) return false;
      }

      // Accept Promo Codes (يدعم غياب الحقل)
      if (acceptPromo && !doc.acceptPromo) return false;

      // Fee filter
      if (fee && fee !== 'any') {
        if (fee === 'lt50' && !(doc.price < 50)) return false;
        if (fee === '50-100' && !(doc.price >= 50 && doc.price <= 100)) return false;
        if (fee === '100-200' && !(doc.price > 100 && doc.price <= 200)) return false;
        if (fee === '200-300' && !(doc.price > 200 && doc.price <= 300)) return false;
        if (fee === 'gt300' && !(doc.price > 300)) return false;
      }

      return true;
    });
  }
}


