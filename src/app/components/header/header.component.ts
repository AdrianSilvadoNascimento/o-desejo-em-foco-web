import { Component, Input } from '@angular/core'

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { AccountService } from 'src/app/services/account.service'
import { UtilsService } from 'src/app/services/utils.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent {
  @Input() showButton!: boolean
  isToggleMenu: boolean = true
  isHideButton: boolean = false
  employeeName?: string
  faBars = faBars

  constructor(private utilService: UtilsService, private readonly accountService: AccountService) {}

  ngOnInit(): void {
    this.utilService.$toggleMenu.subscribe(res => {
      this.isToggleMenu = res
    })

    this.utilService.$hideToggleMenu.subscribe(res => {
      this.isHideButton = res
    })

    this.employeeName = localStorage.getItem('name')!!
    this.accountService.updateEmployeeName(this.employeeName)

    this.accountService.$employeeName.subscribe(res => {
      this.employeeName = res
    })    
  }

  toggleMenu(): void {
    this.isToggleMenu = !this.isToggleMenu

    this.utilService.toggle(this.isToggleMenu)
  }
}
