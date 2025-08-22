// auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuth = authService.isAuthenticated();
  const user = authService.currentUserValue; // جلب المستخدم الحالي
  const url = state.url;

  const guestOnlyRoutes = ['/login', '/register', '/verify-otp', '/forgot-password', '/reset-password'];

  // منع الضيوف من الدخول لصفحات تسجيل الدخول لو مسجل دخول
  if (isAuth && guestOnlyRoutes.some(r => url.startsWith(r))) {
    // إعادة التوجيه حسب الدور
    if (user?.role === 'admin') router.navigate(['/admin']);
    else if (user?.role === 'doctor') router.navigate(['/doctor']);
    else router.navigate(['/patient']); // افتراضي للمستخدم العادي
    return false;
  }

  // منع المستخدمين الغير مسجل دخول من الدخول للصفحات المحمية
  const protectedRoutes = ['/patient', '/doctor', '/admin', '/contact-us'];
  if (!isAuth && protectedRoutes.some(r => url.startsWith(r))) {
    router.navigate(['/login']);
    return false;
  }

  // منع المستخدمين العاديين من دخول صفحة الادمن
  if (isAuth && user?.role !== 'admin' && url.startsWith('/admin')) {
    router.navigate(['/contact-us']);
    return false;
  }

  return true;
};
