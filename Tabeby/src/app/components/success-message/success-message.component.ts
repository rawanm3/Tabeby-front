import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-message',
  template: `
    <div class="success-overlay" *ngIf="show">
      <div class="success-message">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
        <button class="btn-close" (click)="close()">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .success-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease-in;
    }

    .success-message {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      text-align: center;
      max-width: 400px;
      margin: 1rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      animation: slideIn 0.3s ease-out;
    }

    .success-icon {
      font-size: 3rem;
      color: #28a745;
      margin-bottom: 1rem;
    }

    .success-message h3 {
      color: #28a745;
      margin-bottom: 0.5rem;
      font-size: 1.5rem;
    }

    .success-message p {
      color: #666;
      margin-bottom: 1.5rem;
    }

    .btn-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #999;
      cursor: pointer;
      position: absolute;
      top: 10px;
      right: 15px;
    }

    .btn-close:hover {
      color: #333;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideIn {
      from { transform: translateY(-50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class SuccessMessageComponent implements OnInit {
  @Input() title: string = 'تم بنجاح!';
  @Input() message: string = 'تمت العملية بنجاح';
  @Input() duration: number = 3000;
  
  show: boolean = false;

  ngOnInit() {}

  display() {
    this.show = true;
    if (this.duration > 0) {
      setTimeout(() => {
        this.close();
      }, this.duration);
    }
  }

  close() {
    this.show = false;
  }
}
