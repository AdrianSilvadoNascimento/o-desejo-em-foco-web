import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PixService {
  private readonly BASE_URl = environment.BASE_URL
  
  constructor(private readonly http: HttpClient) {}

  getPixPayment(): Observable<any> {
    const url = `${this.BASE_URl}/pix/cob`
    return this.http.get(url).pipe((res) => res);
  }
}
