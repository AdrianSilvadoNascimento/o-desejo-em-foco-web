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

  registerItem(itemModel: ItemModel): Observable<ItemModel> {
    return this.http.post<ItemModel>(this.URL, itemModel)
  }
  
  updateItem(itemModel: ItemModel, item_id: string): Observable<ItemModel> {
    return this.http.put<ItemModel>(this.URL, itemModel)
  }
  
  getItems(): Observable<ItemModel[]> {
    return this.http.get<ItemModel[]>(this.URL)
  }

  getItem(item_id: string): Observable<ItemModel> {
    return this.http.get<ItemModel>(`${this.URL}/${item_id}`)
  }
}
