import { Component, Input } from '@angular/core';

import { faBars, faMinus } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/services/account.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent {
  @Input() showButton!: boolean;
  isToggleMenu: boolean = true;
  isHideButton: boolean = false;
  accountName?: string;
  remainingDays!: number;
  isRemainingInfoHide!: boolean;
  faBars = faBars;
  faMinus = faMinus;

  constructor(
    private utilService: UtilsService,
    private readonly accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.utilService.$toggleMenu.subscribe((res) => {
      this.isToggleMenu = res;
    });

    this.utilService.$hideToggleMenu.subscribe((res) => {
      this.isHideButton = res;
    });

    this.accountService.$remainingTrialDays.subscribe((trialDays) => {
      this.remainingDays = trialDays;
    });

    this.remainingDays = parseInt(localStorage.getItem('trialDays')!!);

    this.checkUser();

    this.utilService.$toggleRemainingInfoDays.subscribe((remainingDays) => {
      this.isRemainingInfoHide = remainingDays;
    });

    this.isRemainingInfoHide = !!localStorage.getItem('isHideRemainingInfo')!!;

    this.accountName = localStorage.getItem('account_name')!!;
    this.accountService.updateHeaderAccountName(this.accountName);

    this.accountService.$accountName.subscribe((res) => {
      this.accountName = res;
    });
  }

  checkUser(): void {
    this.accountService
      .getUserInfo(localStorage.getItem('userId')!!)
      .subscribe((res) => {
        if (!res.is_trial) {
          this.isRemainingInfoHide = false;
        }
      });
  }

  toggleRemainingDays(): void {
    this.isRemainingInfoHide = !this.isRemainingInfoHide;
    this.utilService.toggleRemainingDays(this.isRemainingInfoHide);
  }

  toggleMenu(): void {
    this.isToggleMenu = !this.isToggleMenu;

    this.utilService.toggle(this.isToggleMenu);
  }
}
