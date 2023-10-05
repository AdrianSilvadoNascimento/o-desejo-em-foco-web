import { Injectable } from '@angular/core'

import { EmployeeModel } from '../models/employee-model'
import { EmployerModel } from '../models/employer-model'
import { Observable, tap } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly BASE_URL = environment.BASE_URL
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  loginUser(userModel: { email: string, password: string }) {
    const url = `${this.BASE_URL}/user/login-user`
    
    return this.http.post(url, userModel).pipe(tap(res => {
      this.setCache(res)    
      this.router.navigate(['/'])
    }))
  }

  createNewEmployerAccount(employerModel: EmployerModel): Observable<EmployerModel> {
    const url = `${this.BASE_URL}/user/register-user`
    const body = { ...employerModel, type: 1 }

    return this.http.post<EmployerModel>(url, body).pipe(tap(res => {
      this.router.navigate(['../user-login'])
    }))
  }

  setCache(data: any): void {
    localStorage.setItem('userId', data?.userId)
    localStorage.setItem('token', data?.token)
    localStorage.setItem('name', data?.user)
    localStorage.setItem('expiresIn', data?.expiresIn)
  }

  checkout(): void {
    setTimeout(() => {
      localStorage.removeItem('userId')
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      localStorage.removeItem('expiresIn')
    }, 2000)
  }
}
