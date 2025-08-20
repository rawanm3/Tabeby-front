import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuth = authService.isAuthenticated();
  const url = state.url;

  // صفحات مسموحة فقط للضيوف (لو مسجل دخول ما يدخلش)
  const guestOnlyRoutes = ['/login', '/register', '/verify-otp', '/forget-password', '/reset-password'];
  if (isAuth && guestOnlyRoutes.some(r => url.startsWith(r))) {
    router.navigate(['/contact-us']); // أو أي صفحة dashboard
    return false;
  }

  // صفحات محمية (مسموح بيها فقط للي عامل login)
  const protectedRoutes = ['/contact-us']; // ضيفي هنا أي route عايزة تمنعي الضيف يدخلها
  if (!isAuth && protectedRoutes.some(r => url.startsWith(r))) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
