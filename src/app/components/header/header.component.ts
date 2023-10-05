import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { UtilsService } from 'src/app/services/utils.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() showButton!: boolean
  isToggleMenu: boolean = true
  isHideButton: boolean = false
  faBars = faBars

  constructor(private utilService: UtilsService) {}

  ngOnInit(): void {
    this.utilService.$toggleMenu.subscribe(res => {
      this.isToggleMenu = res
    })

    this.utilService.$hideToggleMenu.subscribe(res => {
      this.isHideButton = res
    })
  }

  toggleMenu(): void {
    this.isToggleMenu = !this.isToggleMenu

    this.utilService.toggle(this.isToggleMenu)
  }
}
