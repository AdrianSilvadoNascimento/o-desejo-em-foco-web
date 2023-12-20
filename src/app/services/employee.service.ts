import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { EmployeeModel } from '../models/employee-model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly URL: string = environment.BASE_URL + '/admin/employee'
  private userId = localStorage.getItem('userId')!!
  readonly token: string | null = localStorage.getItem('token')
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  })

  private employeeList = new BehaviorSubject<EmployeeModel[]>([])
  $employeeList = this.employeeList.asObservable()

  constructor(private readonly http: HttpClient) { }

  updateEmployeeList(updatedEmployeeList: EmployeeModel[]): void {
    this.employeeList.next(updatedEmployeeList)
  }

  getEmployees(): Observable<EmployeeModel[]> {
    const url = `${this.URL}/get-employees/${this.userId}`

    return this.http.get<EmployeeModel[]>(url, { headers: this.headers }).pipe(tap(res => res))
  }

  getEmployeeInfo(employeeId: string): Observable<EmployeeModel> {
    const url = `${this.URL}/get-employee-info/${employeeId}/${this.userId}`

    return this.http.get<EmployeeModel>(url, { headers: this.headers }).pipe(tap(res => res))
  }

  registerEmployee(employeeModel: EmployeeModel): Observable<EmployeeModel> {
    const url = `${this.URL}/register-employee/${this.userId}`

    return this.http.post<EmployeeModel>(url, JSON.stringify(employeeModel), { headers: this.headers })
      .pipe(tap(res => res))
  }

  updateEmployee(employeeModel: EmployeeModel, employeeId: string): Observable<EmployeeModel> {
    const url = `${this.URL}/update-employee/${employeeId}`

    return this.http.put<EmployeeModel>(url, JSON.stringify(employeeModel), { headers: this.headers })
      .pipe(tap(res => res))
  }

  deleteEmployee(employeeId: string): Observable<EmployeeModel> {
    const url = `${this.URL}/delete-employee/${employeeId}`

    return this.http.delete<EmployeeModel>(url).pipe(tap(res => res))
  }
}
