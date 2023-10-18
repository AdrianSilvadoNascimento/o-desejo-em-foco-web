import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ItemModel } from 'src/app/models/item-model'

@Component({
    selector: 'app-info-item',
    templateUrl: './info-item.component.html',
    styleUrls: ['./info-item.component.scss'],
    standalone: false,
})
export class InfoItemComponent {
  itemInfo: ItemModel = new ItemModel()
  item_id!: string
  faArrowLeft = faArrowLeft

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  return(): void {
    this.router.navigate(['/index'])
  }
}
