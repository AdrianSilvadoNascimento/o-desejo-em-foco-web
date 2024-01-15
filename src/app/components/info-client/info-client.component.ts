import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { faPen, faUser } from '@fortawesome/free-solid-svg-icons'

import { ClientModel } from '../../../app/models/client-model'
import { ClientService } from '../../../app/services/client.service'
import { UtilsService } from '../../../app/services/utils.service'
import { EmployeeService } from '../../../app/services/employee.service'
import { EmployeeModel } from '../../../app/models/employee-model'
import { NavigationService } from 'src/app/services/navigation.service'

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
    private utilService: UtilsService,
    private router: Router,
    private navigationService: NavigationService
  ) {
    this.activatedRoute.params.subscribe(param => {
      this.id = param['id']
    })
  }

  ngOnInit(): void {
    this.utilService.toggle(false)

    if (this.id) {
      this.fetchClient(this.id)
    }
  }
  
  fetchClient(id: string): void {
    this.clientService.getClient(id).subscribe((res: any) => {
      this.clientInfo = {
        ...res,
        country: res.address[0].country,
        street: res.address[0].street,
        house_number: res.address[0].house_number,
        neighborhood: res.address[0].neighborhood,
        postal_code: res.address[0].postal_code,
      }
      
      this.editRoute = `/edit-client/${res.id}`
    }, err => {
      this.fetchEmployee(id)
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

  return(): void {
    this.router.navigate([this.navigationService.getPreviousRoute()])
  }
}
