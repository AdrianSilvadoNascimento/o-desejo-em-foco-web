import { Injectable } from '@angular/core'
import { Observable, tap } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

import { ItemModel } from '../models/item-model'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private readonly URL = environment.BASE_URL

  constructor(private http: HttpClient, private router: Router) {}

  getItems(): Observable<ItemModel[]> {
    return this.http.get<ItemModel[]>(this.URL)
  }
}
