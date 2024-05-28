import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserModel } from '../models/user-model';
import { BehaviorSubject, Observable, race, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { UtilsService } from './utils.service';
import { UserAddressModel } from '../models/user-address-model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly BASE_URL = environment.BASE_URL + '/user';

  // readonly token: string | null = localStorage.getItem('token');
  // private headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   Authorization: `Bearer ${this.token}`,
  // });

  private accountName = new BehaviorSubject<string>('');
  $accountName = this.accountName.asObservable();

  private remainingTrialDays = new BehaviorSubject<number>(0);
  $remainingTrialDays = this.remainingTrialDays.asObservable();

  private userHaveToPayObs = new BehaviorSubject<boolean>(false);
  $userHaveToPayObs = this.userHaveToPayObs.asObservable();

  private userAccountInfo = new BehaviorSubject<UserModel>(new UserModel());
  $userAccountInfo = this.userAccountInfo.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private readonly utilsService: UtilsService
  ) {}

  updateRemainingTrialDays(remainingTrialDays: number) {
    this.remainingTrialDays.next(remainingTrialDays);
    localStorage.setItem('trialDays', remainingTrialDays.toString());
  }

  updateHeaderAccountName(name: string) {
    this.accountName.next(name);
  }

  updateUserAccountInfo(userInfoModel: UserModel): void {
    this.userAccountInfo.next(userInfoModel);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  isMaster(): boolean {
    const masterAccount = localStorage.getItem('accountType')!;
    return parseInt(masterAccount) === 1;
  }

  loginUser(EmployeeModel: { email: string; password: string }) {
    const url = `${this.BASE_URL}/login-user`;

    return this.http.post(url, EmployeeModel).pipe(
      tap((res: any) => {
        const trialDays = this.calculateRemainingDays(
          new Date(res?.expiration_trial)
        );

        const userId = res['userId'];
        this.updateRemainingTrialDays(trialDays);
        this.setCache(res);
        this.router.navigate(['/index']);
      })
    );
  }

  getUserInfo(userId: string): Observable<UserModel> {
    return this.http
      .get<UserModel>(`${this.BASE_URL}/${userId}/account-info`)
      .pipe(
        tap((res) => {
          this.updateUserAccountInfo(res);
          return res;
        })
      );
  }

  createUserAccount(userModel: UserModel): Observable<UserModel> {
    const url = `${this.BASE_URL}/register-user`;
    const expiration_trial = new Date();
    expiration_trial.setDate(expiration_trial.getDate() + 7);

    const body = { ...userModel, type: 1, expiration_trial };

    return this.http
      .post<UserModel>(url, body)
      .pipe(tap(() => this.router.navigate(['../user-login'])));
  }

  registerAddress(userAddressModel: UserAddressModel): Observable<any> {
    const userId = localStorage.getItem('userId')!!;
    return this.http
      .post(`${this.BASE_URL}/register-address/${userId}`, userAddressModel)
      .pipe(tap((res) => {
        this.router.navigate(['/index'])
        return res
      }));
  }

  setCache(data: any): void {
    const userId = data?.userId;
    const employeeId = data?.employeeId;
    const trialDays = this.calculateRemainingDays(
      new Date(data.expiration_trial)
    );
    let user_name = data?.user;
    localStorage.setItem('userId', userId);
    localStorage.setItem('employeeId', employeeId);
    localStorage.setItem('token', data?.token);
    localStorage.setItem('expiresIn', data?.expiresIn);
    localStorage.setItem('accountType', data?.type);
    localStorage.setItem('trialDays', trialDays.toString());

    if (employeeId?.length) {
      this.getUserInfo(userId).subscribe((user) => {
        localStorage.setItem('employee_name', user_name);

        user_name = user.name;
        this.updateHeaderAccountName(user.name);
        localStorage.setItem('account_name', user_name);
      });
    } else {
      this.updateHeaderAccountName(user_name);
      localStorage.setItem('account_name', user_name);
    }
  }

  checkout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('employeeId');
    localStorage.removeItem('token');
    localStorage.removeItem('account_name');
    localStorage.removeItem('employee_name');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('accountType');
    localStorage.removeItem('trialDays');
    this.updateRemainingTrialDays(0);
    this.utilsService.toggleArea(true);
    this.utilsService.hideFakeSidenav(false);
    this.utilsService.toggleRemainingDays(false);

    localStorage.removeItem('isHideRemainingInfo');
    localStorage.removeItem('isHideFakeSidenav');
  }

  private calculateRemainingDays(endDate: Date): number {
    const today = new Date();

    const remainingDays = Math.ceil(
      (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return remainingDays;
  }
}
