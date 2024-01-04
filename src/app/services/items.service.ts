import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { ItemModel } from '../models/item-model'
import { environment } from 'src/environments/environment'
import { MovementationModel } from '../models/movementation-model'

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private readonly URL = `${environment.BASE_URL}/item`
  private readonly token: string | null = localStorage.getItem('token')
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  })
  private itemListSubject = new BehaviorSubject<ItemModel[]>([])
  $itemList = this.itemListSubject.asObservable()
  
  private movementationListSubject = new BehaviorSubject<[]>([])
  $movementationList = this.movementationListSubject.asObservable()

  constructor(private http: HttpClient) {}

  updateItemList(itemList: ItemModel[]) {
    this.itemListSubject.next(itemList)
  }

  updateMovementationList(movementationList: []) {
    this.movementationListSubject.next(movementationList)
  }
  
  registerItem(itemModel: ItemModel): Observable<ItemModel> {
    itemModel.user_id = localStorage.getItem('userId')!!
    return this.http.post<ItemModel>(
      `${this.URL}/register-item/${localStorage.getItem('userId')}`, itemModel, { headers: this.headers }
    ).pipe(tap(res => res))
  }
  
  updateItem(itemModel: ItemModel, item_id: string): Observable<ItemModel> {
    return this.http.put<ItemModel>(`${this.URL}/update-item/${item_id}`, itemModel, { headers: this.headers })
  }

  deleteItem(item_id: string): Observable<ItemModel> {
    return this.http.delete<ItemModel>(`${this.URL}/delete-item/${item_id}`, { headers: this.headers })
  }
  
  getItems(): Observable<ItemModel[]> {
    return this.http.get<ItemModel[]>(`${this.URL}/${localStorage.getItem('userId')}`, { headers: this.headers })
  }

  getItem(item_id: string): Observable<ItemModel> {
    return this.http.get<ItemModel>(`${this.URL}/get-item/${item_id}`, { headers: this.headers }).pipe(tap(res => res))
  }

  getItemByBarcode(barcode: string): Observable<ItemModel> {
    const url = `${this.URL}/get-item-by-barcode/${barcode}`
    
    return this.http.get<ItemModel>(url, { headers: this.headers }).pipe(tap(res => res))
  }

  registerMovementation(item_id: string, movementationModel: MovementationModel): Observable<any> {
    const url = `${this.URL}/movementation/move`
    const body = {
      itemId: item_id,
      userId: localStorage.getItem('userId'),
      ...movementationModel,
    }

    return this.http.post(url, body, { headers: this.headers }).pipe(tap(res => res))
  }

  getMovementations() {
    return this.http.get(`${this.URL}/movementation/${localStorage.getItem('userId')}`, { headers: this.headers }).pipe(tap((res: any) => res))
  }

  deleteMovementation(movementationId: string) {
    const url = `${this.URL}/movementation/delete-move/${movementationId}`
    return this.http.delete(url, { headers: this.headers }).pipe(tap(res => res))
  }
}
