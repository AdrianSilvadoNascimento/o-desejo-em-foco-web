import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private toggleMenu = new BehaviorSubject<boolean>(true)
  $toggleMenu = this.toggleMenu.asObservable()

  private hideToggleMenu = new BehaviorSubject<boolean>(true)
  $hideToggleMenu = this.hideToggleMenu.asObservable()

  private toggleAdminArea = new BehaviorSubject<boolean>(true)
  $hideToggleAdminArea = this.toggleAdminArea.asObservable()

  constructor() { }

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
}
