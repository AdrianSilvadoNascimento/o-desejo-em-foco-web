import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'

import { EmployerModel } from '../models/employer-model'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { environment } from '../../environments/environment'
import { UtilsService } from './utils.service'
import { EmployeeModel } from '../models/employee-model'

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly BASE_URL = environment.BASE_URL + '/user'

  private employeeName = new BehaviorSubject<string>('')
  $employeeName = this.employeeName.asObservable()
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private readonly utilsServivce: UtilsService
  ) {}
    
  updateEmployeeName(name: string) {
    this.employeeName.next(name)
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null
  }

  isMaster(): boolean {
    const masterAccount = localStorage.getItem('accountType')!
    return parseInt(masterAccount) === 1
  }

  loginUser(userModel: { email: string, password: string }) {
    const url = `${this.BASE_URL}/login-user`

    return this.http.post(url, userModel).pipe(tap(res => {
      this.setCache(res)
      this.router.navigate(['/'])
    }))
  }

  getUserInfo(userId: string): Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(`${this.BASE_URL}/${userId}/account-info`).pipe(tap(res => res))
  }

  createNewEmployerAccount(employerModel: EmployerModel): Observable<EmployerModel> {
    const url = `${this.BASE_URL}/register-user`
    const body = { ...employerModel, type: 1 }

    return this.http.post<EmployerModel>(url, body).pipe(tap(() => this.router.navigate(['../user-login'])))
  }

  setCache(data: any): void {
    const userId = data?.userId
    const employeeId = data?.employeeId
    const user_name = data?.user
    localStorage.setItem('userId', userId)
    localStorage.setItem('employeeId', employeeId)
    localStorage.setItem('token', data?.token)
    localStorage.setItem('name', user_name)
    localStorage.setItem('expiresIn', data?.expiresIn)
    localStorage.setItem('accountType', data?.type)

    if (employeeId?.length) {
      this.getUserInfo(userId).subscribe(user => {
        this.updateEmployeeName(user.name)
      })
    } else {
      this.updateEmployeeName(user_name)
    }
  }
  
  checkout(): void {
    setTimeout(() => {
      localStorage.removeItem('userId')
      localStorage.removeItem('employeeId')
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      localStorage.removeItem('expiresIn')
      localStorage.removeItem('accountType')
      this.utilsServivce.toggleArea(true)
    }, 2000)
  }
}
