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
  isMaster: boolean = false
  isAdminArea!: boolean

  constructor(
    private utilService: UtilsService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.isMaster = this.accountService.isMaster()
    this.utilService.$toggleMenu.subscribe(res => {
      setTimeout(() => {
        this.toggleSideNav = res
      })
    })

    this.utilService.toggleArea(JSON.parse(localStorage.getItem('toggleArea')!!))
    this.utilService.$hideToggleAdminArea.subscribe(res => {
      setTimeout(() => {
        this.isAdminArea = res
      })
    })
  }
  
  toggleAdmin(): void {
    this.isAdminArea = !this.isAdminArea
    this.utilService.toggleArea(this.isAdminArea)
  }
  
  checkout(): void {
    this.accountService.checkout()
  }
}
