import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

import { ItemModel } from '../models/item-model'
import { environment } from 'src/environments/environment'
import { MovementationModel } from '../models/movementation-model'

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private readonly URL = environment.BASE_URL
  private itemListSubject = new BehaviorSubject<ItemModel[]>([])
  $itemList = this.itemListSubject.asObservable()

  constructor(private http: HttpClient, private router: Router) {}

  updateItemList(itemList: ItemModel[]) {
    this.itemListSubject.next(itemList)
  }
  
  registerItem(itemModel: ItemModel): Observable<ItemModel> {
    const body = { ...itemModel, userId: localStorage.getItem('userId') }
    return this.http.post<ItemModel>(`${this.URL}/register-item`, body).pipe(tap(res => res))
  }
  
  updateItem(itemModel: ItemModel, item_id: string): Observable<ItemModel> {
    return this.http.put<ItemModel>(`${this.URL}/update-item/${item_id}`, itemModel)
  }

  deleteItem(item_id: string): Observable<ItemModel> {
    return this.http.delete<ItemModel>(`${this.URL}/delete-item/${item_id}`)
  }
  
  getItems(): Observable<ItemModel[]> {
    return this.http.get<ItemModel[]>(`${this.URL}/${localStorage.getItem('userId')}`)
  }

  getItem(item_id: string): Observable<ItemModel> {
    return this.http.get<ItemModel>(`${this.URL}/get-item/${item_id}`).pipe(tap(res => res))
  }

  registerMovementation(item_id: string, movementationModel: MovementationModel): Observable<any> {
    const url = `${this.URL}/movementation/move`
    const body = {
      itemId: item_id,
      userId: localStorage.getItem('userId'),
      ...movementationModel,
    }

    return this.http.post(url, body).pipe(tap(res => {
      console.log('Res:', res)
    }))
  }
}
