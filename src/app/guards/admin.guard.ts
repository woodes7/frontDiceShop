import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../service/admin.service';

export const adminGuard: CanActivateFn = async (route, state) => {
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

  const user = JSON.parse(userJson);

  try {
    const isAdmin = await adminService.isAdmin(user.id).toPromise();
    if (!isAdmin) {
      router.navigate(['/unauthorized']);
      return false;
    }
    return true;
  } catch (err) {
    router.navigate(['/login']);
    return false;
  }
};

/*

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../service/admin.service';

export const adminGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
  const adminService = inject(AdminService);

  const userJson = sessionStorage.getItem('user');
  if (!userJson) {
    router.navigate(['/login']);
    return false;
  }

  const user = JSON.parse(userJson);

  if (!adminService.isAdmin(user)) {
    return false;
  }

  return true;
};
*/