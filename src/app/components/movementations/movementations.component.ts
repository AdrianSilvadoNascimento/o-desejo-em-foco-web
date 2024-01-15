import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { faArrowLeft, faCamera, faTrash } from '@fortawesome/free-solid-svg-icons'
import { CategoryModel } from 'src/app/models/category-model'
import { ItemsService } from 'src/app/services/items.service'
import { NavigationService } from 'src/app/services/navigation.service'
import { UtilsService } from 'src/app/services/utils.service'

@Component({
    selector: 'app-movementations',
    templateUrl: './movementations.component.html',
    styleUrls: ['./movementations.component.scss'],
    standalone: false,
})
export class MovementationsComponent {
  itemId!: string
  displayedColumns: string[] = ['image', 'name', 'category', 'quantity', 'unit_price', 'move_type', 'updated_at', 'responsible', 'action_buttons']
  categoryList: CategoryModel[] = []
  movementations: any
  move_type: { type: string } = { type: 'Entrada' }
  faCamera = faCamera
  faArrowLeft = faArrowLeft
  faTrash = faTrash

  constructor(
    private activatedRoute: ActivatedRoute,
    private itemService: ItemsService,
    private utilService: UtilsService,
    private router: Router,
    private navigationService: NavigationService
  ) {
    this.activatedRoute.params.subscribe(param => {
      this.itemId = param['id']
    })
  }
  
  ngOnInit(): void {
    this.utilService.toggle(false)

    this.fetchCategories()

    this.fetchMovementations()
  }

  fetchCategories(): void {
    this.utilService.fetchCategories().subscribe(categories => {
      this.categoryList = categories
    })
  }

  fetchMovementations(): void {
    if (!this.itemId) {
      this.itemService.getMovementations().subscribe(res => {
        this.itemService.updateMovementationList(res)
      })

      this.itemService.$movementationList.subscribe(res => {
        this.movementations = [ ...res ]
      })
    }
  }

  deleteMovementation(movementationId: string): void {
    const confirm_delete = confirm('Deseja excluir essa movimentação?')

    if (confirm_delete) {
      this.itemService.deleteMovementation(movementationId).subscribe(() => {
        alert('Movimentação deletada com sucesso!')

        this.itemService.getMovementations().subscribe(res => {
          this.itemService.updateMovementationList(res)
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

  return(): void {
    this.router.navigate([this.navigationService.getPreviousRoute()])
  }
}
