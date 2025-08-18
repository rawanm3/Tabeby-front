import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tabeby';
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
