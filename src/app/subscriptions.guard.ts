import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AccountService } from './services/account.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.accountService
      .getUserInfo(localStorage.getItem('userId')!!)
      .pipe(
        map((userInfo) => {
          if (
            this.accountService.isLoggedIn() &&
            (userInfo?.subscription_id ||
              userInfo.is_assinant ||
              !userInfo.is_trial)
          ) {
            return true;
          } else {
            this.router.navigate(['/index']);
            return false;
          }
        })
      );
  }
}
