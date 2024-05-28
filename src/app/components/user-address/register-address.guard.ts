import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AccountService } from '../../../app/services/account.service';

@Injectable()
export class RegisterAddressGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.accountService
      .getUserInfo(localStorage.getItem('userId')!!)
      .pipe(
        map((userInfo) => {
          if (userInfo.user_address.length > 0) {
            return true;
          } else {
            this.router.navigate(['/register-address']);
            return false;
          }
        })
      );
  }
}
