import { Component } from '@angular/core'

import { UtilsService } from './services/utils.service'
import { AccountService } from './services/account.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  toggleSideNav!: boolean
  shouldShowButton!: boolean

  constructor(
    private utilService: UtilsService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.utilService.$toggleMenu.subscribe(res => {
      setTimeout(() => {
        this.toggleSideNav = res
      })
    })
  }

  checkout(): void {
    this.accountService.checkout()
  }
}
