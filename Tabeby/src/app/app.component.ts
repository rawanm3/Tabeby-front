import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'Tabeby';
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
  };
     user: User | null = null;
   
   constructor(private authService: AuthService,private router:Router ) {}
 ngOnInit(): void {
     this.authService.currentUser$.subscribe((u) => {
       this.user = u;
     });
   }
   logout() {
     this.authService.logout();
   }
  isDarkMode = false;
  isRTL = false;
  isOpen = false;

  toggleMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  toggleLang(): void {
    this.isRTL = !this.isRTL;
    document.documentElement.dir = this.isRTL ? 'rtl' : 'ltr';
  }
}
