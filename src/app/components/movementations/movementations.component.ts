import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

import { ItemModel } from 'src/app/models/item-model'
import { ItemsService } from 'src/app/services/items.service'

@Component({
  selector: 'app-movementations',
  templateUrl: './movementations.component.html',
  styleUrls: ['./movementations.component.scss'],
})
export class MovementationsComponent implements OnInit {
  itemId!: string
  displayedColumns: string[] = ['image', 'name', 'category', 'quantity', 'unit_price', 'updated_at', 'action_buttons']
  movementations: object[] = []
  faCamera = faCamera

  constructor(
    private activatedRoute: ActivatedRoute,
    private itemService: ItemsService
  ) {}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.itemId = param['id']
    })

    if (!this.itemId) {
      this.itemService.getMovementations().subscribe(res => {
        // console.log('res:', res)
      })
    }
  }
}
