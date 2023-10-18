import { Component } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'

import { ActivatedRoute } from '@angular/router'

import { ItemModel } from 'src/app/models/item-model'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { ConvertImageService } from 'src/app/services/convert-image.service'
import { ItemsService } from 'src/app/services/items.service'

@Component({
  selector: 'app-register-item',
  templateUrl: './register-item.component.html',
  styleUrls: ['./register-item.component.scss'],
  standalone: false,
})
export class RegisterItemComponent {
  itemGroup: FormGroup = new FormGroup({})
  selectedImage!: any
  selectedFile!: File
  isChangingImage: boolean = false
  faCamera = faCamera
  item_id!: string
  itemInfo!: ItemModel
  save_button: string = 'Cadastrar'
  header: string = 'Novo Produto'

  constructor(
    private formBuilder: FormBuilder,
    private itemsService: ItemsService,
    private activatedRoute: ActivatedRoute,
    private imageConverter: ConvertImageService
  ) {}

  ngOnInit(): void {
    this.createForm(new ItemModel)

    this.activatedRoute.params.subscribe(param => {
      this.item_id = param['id']
    })

    if (this.item_id) {
      this.save_button = 'Salvar'
      this.header = 'Editar Produto'

      this.itemsService.getItem(this.item_id).subscribe(res => {
        this.itemInfo = res
        this.itemGroup.patchValue({
          name: res.name,
          quantity: res.quantity,
          unit_price: res.unit_price,
          category: res.category,
        })
        this.selectedImage = res.product_image
        const image = new File([res.product_image], 'ovo.jpg', { type: 'image/jpeg' })
        this.selectedFile = image
      })
    }
  }

  createForm(itemModel: ItemModel): void {
    this.itemGroup = this.formBuilder.group({
      name: [itemModel.name],
      unit_price: [itemModel.unit_price],
      category: [itemModel.category],
      quantity: [itemModel.quantity],
      product_image: [itemModel.product_image],
    })
  }

  async onSubmit() {
    const ITEM: ItemModel = {...this.itemGroup.value}
    
    ITEM.product_image = this.isChangingImage
      ? await this.imageConverter.convertToBase64(this.selectedFile)
      : this.itemInfo.product_image
    
    if (this.item_id) {
      console.log(ITEM)
      this.itemsService.updateItem(ITEM, this.item_id).subscribe(() => {
        this.excludeImage()
        this.createForm(new ItemModel())
        alert('Produto atualizado com sucesso!')
      }, err => {
        alert(err.error.message)
      })
    } else {
      this.itemsService.registerItem(ITEM).subscribe(() => {
        this.excludeImage()
        this.createForm(new ItemModel())
        alert('Produto registrado com sucesso!')
      }, err => {
        alert(err.error.message)
      })
    }
  }

  excludeImage(): void {
    this.selectedImage = null
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0]
    
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        this.selectedFile = file
        this.selectedImage = reader.result
        this.isChangingImage = true
      }
    }
  }
}
