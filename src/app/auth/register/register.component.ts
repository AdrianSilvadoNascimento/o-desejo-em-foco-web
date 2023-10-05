import { Component, OnInit } from '@angular/core'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { UtilsService } from 'src/app/services/utils.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  faArrowLeft = faArrowLeft

  constructor(private utilService: UtilsService) {}

  ngOnInit(): void {
    this.utilService.toggle(false)
    this.utilService.hideMenuButton(true)
  }
}
