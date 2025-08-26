import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GoogleService } from 'src/app/services/google.service';

@Component({
  selector: 'app-choose-slot',
  templateUrl: './choose-slot.component.html',
  styleUrls: ['./choose-slot.component.scss']
})
export class ChooseSlotComponent {
googleConnectStatus: string = '';

  get isGoogleConnected(): boolean {
    const u = this.auth.currentUserValue;
    return !!u?.google?.accessToken; // غيّريها حسب شكل اليوزر اللي بيرجع من الباك
  }

  constructor(
    private auth: AuthService,
    private google: GoogleService,
    private route: ActivatedRoute
  ) {}

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(p => {
//       if (p['google'] === 'connected') {
//         this.googleConnectStatus = '✅ تم ربط حساب Google بنجاح';
//         this.auth.getCurrentUser().subscribe();
//       }
//       if (p['google'] === 'failed') {
//         this.googleConnectStatus = '❌ فشل الربط. حاولي تاني.';
//       }
//     });
//   }
// signUpWithGoogle() {
//   this.authService.signUpWithGoogle();
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
}
