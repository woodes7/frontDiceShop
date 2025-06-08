import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../service/admin.service';

export const logedGurad: CanActivateFn = (route, state) => {
    const router = inject(Router);
  const adminService = inject(AdminService);

  const userJson = sessionStorage.getItem('user');
  
  if (!userJson) {
    router.navigate(['/pages/login']);
    return false;
  }else{
    const user = JSON.parse(userJson!);
    if(!user.emailConfirmed){
      router.navigate(['/pages/login']);
      return false;
    }
  }
  return true;
};
