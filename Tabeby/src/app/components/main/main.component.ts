import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {
  formData = {
    name: '',
    phone: '',
    email: '',
    message: ''
  };

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    // نجيب كل الـ inputs والـ textarea من داخل الـ component
    const formInputs = this.el.nativeElement.querySelectorAll('input, textarea');

    formInputs.forEach((input: HTMLInputElement | HTMLTextAreaElement) => {
      // Add focus effect
      input.addEventListener('focus', function () {
        input.parentElement?.classList.add('focused');
      });

      // Remove focus effect
      input.addEventListener('blur', function () {
        if (input.value === '') {
          input.parentElement?.classList.remove('focused');
        }
      });
    });

    // Animate social icons on hover
    const socialIcons = this.el.nativeElement.querySelectorAll('.social i');
    socialIcons.forEach((icon: HTMLElement) => {
      icon.addEventListener('mouseenter', function () {
        icon.style.transform = 'translateY(-5px)';
      });

      icon.addEventListener('mouseleave', function () {
        icon.style.transform = 'translateY(0)';
      });
    });
  }

  onSubmit() {
    console.log(this.formData);
    alert("✅ Your message has been sent!");
  }
}
