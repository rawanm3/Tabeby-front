import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() filterChange = new EventEmitter<any>();

  filter = {
    name: '',
    specialty: '',
    city: '',
    maxPrice: null,
    titleProfessor: false,
    titleLecturer: false,
    titleConsultant: false,
    titleSpecialist: false,
    genderFemale: false,
    genderMale: false,
    acceptPromo: false,
    fee: 'any',
    availability: 'any', 
    entity: '', 
    role: 'any' 
  };

  onFilterChange() {
    this.filterChange.emit(this.filter);
  }
}
