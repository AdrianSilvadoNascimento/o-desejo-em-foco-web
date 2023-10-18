import { Component, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ItemModel } from 'src/app/models/item-model'
import { MovementationModel } from 'src/app/models/movementation-model'
import { ItemsService } from 'src/app/services/items.service'

@Component({
  selector: 'app-info-item-template',
  templateUrl: './info-item-template.component.html',
  styleUrls: ['./info-item-template.component.scss'],
  standalone: false,
})
export class InfoItemTemplateComponent {
  @Input() itemId!: string
  @Input() isMovementation: boolean = false
  @Input() headerMessage!: string
  movementationForm: FormGroup = new FormGroup({})
  itemInfo: ItemModel = new ItemModel()
  types: { html: string, value: string }[] = [
    { html: 'Entrada', value: 'Entrada' },
    { html: 'Saída', value: 'Saída' },
  ]

  faArrowLeft = faArrowLeft
  
  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.itemId = param['id']
    })

    if (this.itemId) {
      this.itemService.getItem(this.itemId).subscribe(res => {
        this.itemInfo = res
      }, err => {
        alert(err.error.message)
      })
    }

    if (this.isMovementation) {
      this.createForm(new MovementationModel())
    }
  }

  createForm(movementationModel: MovementationModel): void {
    this.movementationForm = this.formBuilder.group({
      move_type: [movementationModel.move_type, Validators.required],
      quantity: [movementationModel.quantity, Validators.required],
    })
  }

  onSubmit(): void {
    this.itemService.registerMovementation(this.itemId, this.movementationForm.value).subscribe(() => {
      alert('Movimentação feita com sucesso!')
      this.createForm(new MovementationModel())
    }, err => {
      alert(err.error.message)
    })
  }

  return(): void {
    this.router.navigate(['/index'])
  }
}
