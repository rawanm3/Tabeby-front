import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent  {
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
}
