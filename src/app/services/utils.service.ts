import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { CategoryModel } from '../models/category-model'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private readonly BASE_URL = `${environment.BASE_URL}/admin/category`
  readonly token: string | null = localStorage.getItem('token')
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  })

  private toggleMenu = new BehaviorSubject<boolean>(true)
  $toggleMenu = this.toggleMenu.asObservable()

  private hideToggleMenu = new BehaviorSubject<boolean>(true)
  $hideToggleMenu = this.hideToggleMenu.asObservable()

  private toggleAdminArea = new BehaviorSubject<boolean>(true)
  $hideToggleAdminArea = this.toggleAdminArea.asObservable()

  private categoryList$!: Observable<CategoryModel[]> | null

  constructor(private http: HttpClient) { }

  toggle(toggle: boolean): void {
    this.toggleMenu.next(toggle)
  }

  hideMenuButton(hide: boolean): void {
    this.hideToggleMenu.next(hide)
  }

  toggleArea(toggle: boolean): void {
    this.toggleAdminArea.next(toggle)
    localStorage.setItem('toggleArea', JSON.stringify(toggle))
  }

  locateEmployeePosition(type: number): string {
    let position!: string
    switch (type) {
      case 1:
        position = 'Master'
        break
      case 2:
        position = 'Operário'
        break
      default:
        position = 'Analista'
        break
    }

    return position
  }

  fetchCategories(): Observable<CategoryModel[]> {
    const userId = localStorage.getItem('userId')!!
    if (!this.categoryList$) {
      this.categoryList$ = this.http.get<CategoryModel[]>(`${this.BASE_URL}/get-categories/${userId}`, { headers: this.headers }).pipe(tap(res => res))
      shareReplay(1)
    }

    return this.categoryList$
  }

  deleteCategory(categoryId: string): Observable<CategoryModel> {
    this.categoryList$ = null

    return this.http.delete<CategoryModel>(`${this.BASE_URL}/delete-category/${categoryId}`, { headers: this.headers }).pipe(tap(res => res))
  }
}
