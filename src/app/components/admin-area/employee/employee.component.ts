import { Component, OnInit } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EmployeeModel } from 'src/app/models/employee-model';
import { EmployeeService } from 'src/app/services/employee.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employeeList: EmployeeModel[] = []
  displayedColumns: string[] = ['name', 'email', 'type', 'action_buttons']
  faPen = faPen
  faTrash = faTrash

  constructor(
    private employeeService: EmployeeService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.fetchEmployees()
    this.utilsService.toggle(false)
  }

  fetchEmployees(): void {
    this.employeeService.getEmployees().subscribe(res => {
      this.employeeService.updateEmployeeList(res)
    }, err => {
      alert(err.error.message)
    })

    this.employeeService.$employeeList.subscribe(res => {
      this.employeeList = [ ...res ]
    }, err => {
      alert(err.error.message)
    })

    this.utilsService.hideMenuButton(false)
  }

  deleteEmployee(employeeId: string): void {
    const confirm_delete = confirm('Deseja excluir este funcionário?')
    if (confirm_delete) {
      this.employeeService.deleteEmployee(employeeId).subscribe(res => {
        alert('Funcionário deletado com sucesso')

        this.employeeService.getEmployees().subscribe(res => {
          this.employeeService.updateEmployeeList(res)
        })
      }, err => {
        alert(err.error.message)
      })
    }
  }
}
