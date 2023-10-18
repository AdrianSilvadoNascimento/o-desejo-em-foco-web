import { Component } from '@angular/core'

import { ItemModel } from 'src/app/models/item-model'
import { ItemsService } from 'src/app/services/items.service'
import { faTrash, faPen, faCamera, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { UtilsService } from 'src/app/services/utils.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent {
  displayedColumns: string[] = ['image', 'name', 'category', 'quantity', 'unit_price', 'updated_at', 'action_buttons']
  items: ItemModel[] = []
  faTrash = faTrash
  faPen = faPen
  faCamera = faCamera
  faTransaction = faArrowRightArrowLeft

  constructor(
    private itemsService: ItemsService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.fetchItems()
  }

  fetchItems(): void {
    this.itemsService.getItems().subscribe(res => {
      this.itemsService.updateItemList(res)
    })
    
    this.itemsService.$itemList.subscribe(res => {
      this.items = [ ...res ]
    })

    this.utilsService.hideMenuButton(false)
  }

  deleteItem(item_id: string): void {
    const confirm_delete = confirm('Deseja excluir este item?')
    if (confirm_delete) {
      this.itemsService.deleteItem(item_id).subscribe(() => {
        alert('Produto deletado com sucesso!')

        this.itemsService.getItems().subscribe(res => {
          this.itemsService.updateItemList(res)
        })
      }, err => {
        alert(err.error.message)
      })
    }
  }
}
