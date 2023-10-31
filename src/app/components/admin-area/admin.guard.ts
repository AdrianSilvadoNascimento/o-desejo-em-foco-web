import { Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"

import { AccountService } from "../../services/account.service"


@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.accountService.isMaster()) {
      return true
    } else {
      this.router.navigate(['/../index'])
      return false
    }
  }
}