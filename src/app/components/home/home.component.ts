import { Component, OnInit } from '@angular/core'

import { ItemModel } from 'src/app/models/item-model'
import { ItemsService } from 'src/app/services/items.service'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['image', 'name', 'category', 'quantity', 'unit_price', 'updated_at', 'action_buttons']
  items: ItemModel[] = []
  faTrash = faTrash
  faPen = faPen

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.fetchItems()
  }

  fetchItems(): void {
    this.itemsService.getItems().subscribe(res => {
      console.log(res)
      this.items = [ ...res ]
    })
  }
}
