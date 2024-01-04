import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { faPen, faUser } from '@fortawesome/free-solid-svg-icons'

import { ClientModel } from '../../../app/models/client-model'
import { ClientService } from '../../../app/services/client.service'
import { UtilsService } from '../../../app/services/utils.service'
import { EmployeeService } from '../../../app/services/employee.service'
import { EmployeeModel } from '../../../app/models/employee-model'

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.component.html',
  styleUrls: ['./info-client.component.scss'],
  standalone: false,
})
export class InfoClientComponent {
  clientOrEmployee: string = 'Cliente'
  isEmployee: boolean = false
  editRoute!: string
  clientInfo!: ClientModel
  employeeInfo!: EmployeeModel
  employeePosition!: string
  id!: string
  faUser = faUser
  faPen = faPen

  constructor(
    private clientService: ClientService,
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private utilService: UtilsService
  ) {}

  ngOnInit(): void {
    this.utilService.toggle(false)

    this.activatedRoute.params.subscribe(param => {
      this.id = param['id']
    })

    if (this.id) {
      this.fetchClient(this.id)
    }
  }
  
  fetchClient(id: string): void {
    this.clientService.getClient(id).subscribe(res => {
      this.clientInfo = res
      this.editRoute = `/edit-client/${res.id}`
    }, err => {
      this.fetchEmployee(this.id)
      console.error(err)
    })
  }

  fetchEmployee(employeeId: string): void {
    this.employeeService.getEmployeeInfo(employeeId).subscribe(res => {
      this.employeeInfo = res
      this.employeePosition = this.utilService.locateEmployeePosition(res.type)
      this.editRoute = `/admin/edit-employee/${res.id}`
      this.clientOrEmployee = 'Funcionário'
    }, err => {
      console.error(err)
    })
  }
}
