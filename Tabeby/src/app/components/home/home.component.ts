import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // Mobile menu toggle
    const mobileToggle = document.querySelector<HTMLElement>('.mobile-menu-toggle');
    const navMenu = document.querySelector<HTMLElement>('.nav-menu');

    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
      });
    }

    // Search tabs functionality
    const tabs = document.querySelectorAll<HTMLElement>('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId) {
          const targetSection = document.querySelector<HTMLElement>(targetId);
          targetSection?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Form submissions
    const contactForm = document.querySelector<HTMLFormElement>('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
      });
    }

    const newsletterForm = document.querySelector<HTMLFormElement>('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
      });
    }

    // Search functionality
    const searchBtn = document.querySelector<HTMLButtonElement>('.search-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        const specialty = (document.getElementById('specialty') as HTMLInputElement)?.value;
        const location = (document.getElementById('location') as HTMLInputElement)?.value;
        const date = (document.getElementById('date') as HTMLInputElement)?.value;

        if (!specialty || !location || !date) {
          alert('Please fill in all search fields');
          return;
        }

        alert(`Searching for ${specialty} doctors in ${location} on ${date}`);
      });
    }

    // Add mobile menu styles dynamically
    const style = this.renderer.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .nav-menu.active {
          display: block;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          padding: 1rem;
        }
        
        .nav-menu.active ul {
          flex-direction: column;
          gap: 1rem;
        }
      }
    `;
    this.renderer.appendChild(document.head, style);
  }
}
