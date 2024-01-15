import { Component } from '@angular/core'

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ItemModel } from 'src/app/models/item-model'
import { UtilsService } from 'src/app/services/utils.service'

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

  constructor(private utilService: UtilsService) {}

  ngOnInit(): void {
    this.utilService.toggle(false)
  }
}
