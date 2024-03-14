import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAddressInfoService {
  private readonly base_url = 'http://viacep.com.br/ws'

  constructor(private http: HttpClient) {}

  getAddressInfo(postal_code: string): Observable<any> {
    return this.http.get(`${this.base_url}/${postal_code}/json/`).pipe(tap(res => res))
  }
}
