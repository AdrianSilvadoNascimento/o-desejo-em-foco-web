import { Injectable } from '@angular/core';
import { SubscriptionModel } from '../models/subscriptions-model';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  private readonly BASE_URL = `${environment.BASE_URL}/credit`;
  private readonly token: string | null = localStorage.getItem('token');
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
  });

  constructor(private http: HttpClient) {}

  contractSubscription(subscriptionInfo: SubscriptionModel): Observable<any> {
    return this.http
      .post(`${this.BASE_URL}/subscription`, subscriptionInfo, { headers: this.headers })
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }
}
