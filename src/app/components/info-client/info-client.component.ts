import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { faPen, faUser } from '@fortawesome/free-solid-svg-icons'
import { ClientModel } from 'src/app/models/client-model'
import { ClientService } from 'src/app/services/client.service'

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.component.html',
  styleUrls: ['./info-client.component.scss'],
  standalone: false,
})
export class InfoClientComponent {
  clientInfo!: ClientModel
  clientId!: string
  faUser = faUser
  faPen = faPen

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.clientId = param['id']
    })

    if (this.clientId) {
      this.fetchClient(this.clientId)
    }
  }

  fetchClient(clientId: string): void {
    this.clientService.getClient(clientId).subscribe(res => {
      this.clientInfo = res
    })
  }
}
