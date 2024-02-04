import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'

import { EmployerModel } from '../models/employer-model'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { environment } from '../../environments/environment'
import { UtilsService } from './utils.service'

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly BASE_URL = environment.BASE_URL + '/user'

  private accountName = new BehaviorSubject<string>('')
  $accountName = this.accountName.asObservable()

  private remainingTrialDays = new BehaviorSubject<Date>(new Date())
  $remainingTrialDays = this.remainingTrialDays.asObservable()
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private readonly utilsServivce: UtilsService
  ) {}
    
  updateRemainingTrialDays(remainingTrialDays: Date) {
    this.remainingTrialDays.next(remainingTrialDays)
  }
  
  updateHeaderAccountName(name: string) {
    this.accountName.next(name)
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

    return this.http.post(url, userModel).pipe(tap((res: any) => {
      this.updateRemainingTrialDays(new Date(res?.expiration_trial))
      this.setCache(res)
      this.router.navigate(['/'])
    }))
  }

  getUserInfo(userId: string): Observable<EmployerModel> {
    return this.http.get<EmployerModel>(`${this.BASE_URL}/${userId}/account-info`).pipe(tap(res => res))
  }

  createNewEmployerAccount(employerModel: EmployerModel): Observable<EmployerModel> {
    const url = `${this.BASE_URL}/register-user`
    const expiration_trial = new Date()
    expiration_trial.setDate(expiration_trial.getDate() + 7)

    const body = { ...employerModel, type: 1, expiration_trial }

    return this.http.post<EmployerModel>(url, body).pipe(tap(() => this.router.navigate(['../user-login'])))
  }

  setCache(data: any): void {
    const userId = data?.userId
    const employeeId = data?.employeeId
    let user_name = data?.user
    localStorage.setItem('userId', userId)
    localStorage.setItem('employeeId', employeeId)
    localStorage.setItem('token', data?.token)
    localStorage.setItem('expiresIn', data?.expiresIn)
    localStorage.setItem('accountType', data?.type)
    
    if (employeeId?.length) {
      this.getUserInfo(userId).subscribe(user => {
        localStorage.setItem('employee_name', user_name)

        user_name = user.name
        this.updateHeaderAccountName(user.name)
        localStorage.setItem('account_name', user_name)
      })
    } else {
      this.updateHeaderAccountName(user_name)
      localStorage.setItem('account_name', user_name)
    }
  }
  
  checkout(): void {
    setTimeout(() => {
      localStorage.removeItem('userId')
      localStorage.removeItem('employeeId')
      localStorage.removeItem('token')
      localStorage.removeItem('account_name')
      localStorage.removeItem('employee_name')
      localStorage.removeItem('expiresIn')
      localStorage.removeItem('accountType')
      this.utilsServivce.toggleArea(true)
    }, 2000)
  }
}
