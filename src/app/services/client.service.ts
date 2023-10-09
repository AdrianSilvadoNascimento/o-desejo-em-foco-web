import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { HttpClient } from '@angular/common/http'

import { ClientModel } from '../models/client-model'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly URL = environment.BASE_URL
  private updatedClientList = new BehaviorSubject<ClientModel[]>([])
  $clientList = this.updatedClientList.asObservable()
  
  constructor(private http: HttpClient) {}

  updateClientList(clientList: ClientModel[]) {
    this.updatedClientList.next(clientList)
  }
  
  registerClient(clientModel: ClientModel): Observable<ClientModel> {
    const url = `${this.URL}/client/register-client/${localStorage.getItem('userId')}`

    return this.http.post<ClientModel>(url, JSON.stringify(clientModel)).pipe(tap(res => res))
  }
  
  getClient(clientId: string): Observable<ClientModel> {
    const url = `${this.URL}/client/${clientId}`
    
    return this.http.get<ClientModel>(url).pipe(tap(res => res))
  }

  getClients(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>(`${this.URL}/client`).pipe(tap(res => res))
  }

  deleteClient(clientId: string): Observable<any> {
    const url = `${this.URL}/client/delete-client/${clientId}`

    return this.http.delete(url).pipe(tap(res => res))
  }
}
