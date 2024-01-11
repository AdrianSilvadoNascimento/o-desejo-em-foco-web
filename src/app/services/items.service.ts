import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { ItemModel } from '../models/item-model'
import { environment } from 'src/environments/environment'
import { MovementationModel } from '../models/movementation-model'
import { AccountService } from './account.service'

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private readonly ITEM_URL = `${environment.BASE_URL}/item`
  private readonly MOVEMENTATION_URL = `${environment.BASE_URL}/movementation`
  private readonly token: string | null = localStorage.getItem('token')
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  })
  private itemListSubject = new BehaviorSubject<ItemModel[]>([])
  $itemList = this.itemListSubject.asObservable()
  
  private movementationListSubject = new BehaviorSubject<[]>([])
  $movementationList = this.movementationListSubject.asObservable()

  constructor(private http: HttpClient, private accountService: AccountService) {}

  updateItemList(itemList: ItemModel[]) {
    this.itemListSubject.next(itemList)
  }

  updateMovementationList(movementationList: []) {
    this.movementationListSubject.next(movementationList)
  }
  
  registerItem(itemModel: ItemModel): Observable<ItemModel> {
    itemModel.user_id = localStorage.getItem('userId')!!
    return this.http.post<ItemModel>(
      `${this.ITEM_URL}/register-item/${localStorage.getItem('userId')}`, itemModel, { headers: this.headers }
    ).pipe(tap(res => res))
  }
  
  updateItem(itemModel: ItemModel, item_id: string): Observable<ItemModel> {
    return this.http.put<ItemModel>(`${this.ITEM_URL}/update-item/${item_id}`, itemModel, { headers: this.headers })
  }

  deleteItem(item_id: string): Observable<ItemModel> {
    return this.http.delete<ItemModel>(`${this.ITEM_URL}/delete-item/${item_id}`, { headers: this.headers })
  }
  
  getItems(): Observable<ItemModel[]> {
    return this.http.get<ItemModel[]>(`${this.ITEM_URL}/${localStorage.getItem('userId')}`, { headers: this.headers })
  }

  getItem(item_id: string): Observable<ItemModel> {
    return this.http.get<ItemModel>(`${this.ITEM_URL}/get-item/${item_id}`, { headers: this.headers }).pipe(tap(res => res))
  }

  getItemByBarcode(barcode: string): Observable<ItemModel> {
    const url = `${this.ITEM_URL}/get-item-by-barcode/${barcode}`
    
    return this.http.get<ItemModel>(url, { headers: this.headers }).pipe(tap(res => res))
  }

  registerMovementation(item_id: string, movementationModel: MovementationModel): Observable<any> {
    const url = `${this.MOVEMENTATION_URL}/move`
    const body = {
      item_id: item_id,
      user_id: localStorage.getItem('userId'),
      employee_id: localStorage.getItem('employeeId'),
      ...movementationModel,
    }

    return this.http.post(url, body, { headers: this.headers }).pipe(tap(res => res))
  }

  getMovementations() {
    return this.http.get(`${this.MOVEMENTATION_URL}/${localStorage.getItem('userId')}`, { headers: this.headers }).pipe(tap((res: any) => res))
  }

  deleteMovementation(movementationId: string) {
    const url = `${this.MOVEMENTATION_URL}/delete-move/${movementationId}`
    return this.http.delete(url, { headers: this.headers }).pipe(tap(res => res))
  }
}
