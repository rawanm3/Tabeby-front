import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorFilterService } from 'src/app/services/doctor-filter.service';
import { GoogleService } from 'src/app/services/google.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})

export class AboutUsComponent implements OnInit{
//  
  // // ✅ لازم يتعرف فوق الكلاس كـ property
  // googleConnectStatus: string = '';

  // get isGoogleConnected(): boolean {
  //   const u = this.auth.currentUserValue;
  //   return !!u?.google?.accessToken; // غيّريها حسب شكل اليوزر اللي بيرجع من الباك
  // }

//   constructor(
//     private authService: AuthService,
//     private google: GoogleService,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     // this.route.queryParams.subscribe(p => {
//     //   if (p['google'] === 'connected') {
//     //     this.googleConnectStatus = '✅ تم ربط حساب Google بنجاح';
//     //     this.auth.getCurrentUser().subscribe();
//     //   }
//     //   if (p['google'] === 'failed') {
//     //     this.googleConnectStatus = '❌ فشل الربط. حاولي تاني.';
//     //   }
//     // });
//   }
// connectGoogle() {
//   this.authService.connectGoogle();
// }

// disconnectGoogle() {
//   this.authService.disconnectGoogle().subscribe({
//     next: (res) => {
//       console.log('Google disconnected', res);
//     },
//     error: (err) => {
//       console.error('Error disconnecting', err);
//     }
//   });
// }

  // connectGoogle() {
  //   const token = this.auth.getToken();
  //   if (!token) {
  //     this.googleConnectStatus = 'يرجى تسجيل الدخول أولاً';
  //     return;
  //   }
  //   window.location.href = this.google.getConnectUrl(token);
  // }

  // disconnectGoogle() {
  //   this.google.disconnect().subscribe({
  //     next: () => {
  //       this.googleConnectStatus = 'تم إلغاء الربط';
  //       this.auth.getCurrentUser().subscribe();
  //     },
  //     error: () => {
  //       this.googleConnectStatus = 'تعذّر إلغاء الربط';
  //     }
  //   });
  // }
  googleConnectStatus: string | null = null;   // عشان نظهر حالة الربط

  constructor(
    private route: ActivatedRoute,
    private GoogleService: GoogleService
  ) {}

  ngOnInit(): void {
    // لو رجعنا من Google ومعانا بارامتر
    this.route.queryParams.subscribe(params => {
      if (params['google']) {
        this.googleConnectStatus = params['google']; // ممكن تكون "connected" أو "failed"
      }
    });
  }

  // زرار ربط Google مع يوزر موجود
  connectGoogle() {
    this.GoogleService.connectGoogle();
  }

  // زرار Sign up باستخدام Google
  signUpWithGoogle() {
    this.GoogleService.signUpWithGoogle();
  }

  // زرار فصل Google
  disconnectGoogle() {
    this.GoogleService.disconnectGoogle().subscribe({
      next: () => this.googleConnectStatus = 'disconnected',
      error: () => this.googleConnectStatus = 'failed'
    });
  }
}
