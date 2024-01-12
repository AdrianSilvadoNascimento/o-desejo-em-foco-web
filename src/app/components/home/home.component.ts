import { Component } from '@angular/core'

import { BarcodeFormat } from '@zxing/library'

import { ItemModel } from 'src/app/models/item-model'
import { ItemsService } from 'src/app/services/items.service'
import { faTrash, faPen, faCamera, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { UtilsService } from 'src/app/services/utils.service'
import { Router } from '@angular/router'
import { CategoryModel } from 'src/app/models/category-model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent {
  categoryList: CategoryModel[] = []
  displayedColumns: string[] = [
    'image',
    'name',
    'category',
    'quantity',
    'unit_price',
    'sale_price',
    'barcode',
    'updated_at',
    'action_buttons',
  ]
  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.EAN_13,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_EAN_EXTENSION,
    BarcodeFormat.UPC_E,
  ]
  isScanning: boolean = false
  items: ItemModel[] = []
  faTrash = faTrash
  faPen = faPen
  faCamera = faCamera
  faTransaction = faArrowRightArrowLeft

  constructor(
    private itemsService: ItemsService,
    private utilsService: UtilsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCategories()
    this.fetchItems()
    this.utilsService.toggle(false)
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

  fetchCategories(): void {
    this.utilsService.fetchCategories().subscribe(categories => {
      this.categoryList = categories
    })
  }

  onCodeResult(resultString: string): void {
    this.itemsService.getItemByBarcode(resultString).subscribe(res => {
      this.isScanning = false
      this.router.navigate([`/info-item/${res.id}`])
    }, err => {
      alert(err.error.message)
      const confirm_button = confirm('Gostaria de registrar um produto com esse código?')
      this.isScanning = false

      if (confirm_button) {
        this.router.navigate([`/register-item/${resultString}`])
      }
    })
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

  getCategoryName(category: string): string {
    let categoryName!: string
    
    this.categoryList.map(cat => cat).filter(cat => {
      if (cat.value === category) {
        categoryName = cat.name
      }
    })

    return categoryName
  }
}
