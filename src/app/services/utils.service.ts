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

  constructor() {}

  toggle(toggle: boolean) {
    this.toggleMenu.next(toggle)
  }

  hideMenuButton(hide: boolean) {
    this.hideToggleMenu.next(hide)
  }
}
