import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ItemModel } from 'src/app/models/item-model'
import { ItemsService } from 'src/app/services/items.service'

@Component({
  selector: 'app-info-item',
  templateUrl: './info-item.component.html',
  styleUrls: ['./info-item.component.scss'],
})
export class InfoItemComponent implements OnInit {
  itemInfo: ItemModel = new ItemModel()
  item_id!: string
  faArrowLeft = faArrowLeft

  constructor(
    private itemService: ItemsService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(param => {
      this.item_id = param['id']
      
      // if (this.item_id) {
      //   this.fetchItem(this.item_id)
      // }
    })
  }

  fetchItem(item_id: string): void {
    // this.itemService.getItem(item_id).subscribe(item => {
    //   this.itemInfo = item
    // }, err => {
    //   alert(err.error.message)
    // })
  }

  return(): void {
    this.router.navigate(['/'])
  }
}
