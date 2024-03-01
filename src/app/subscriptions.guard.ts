import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AccountService } from './services/account.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.accountService.$userHaveToPayObs.pipe(map(haveToPay => {
      if (haveToPay) {
        return true;
      } else {
        this.router.navigate(['/contract-subscription'])
        return false;
      }
    }));
  }
}
