import { Component, OnInit } from '@angular/core'
import { FormGroup, Validators, FormBuilder } from '@angular/forms'

import { ItemModel } from 'src/app/models/item-model'

@Component({
  selector: 'app-register-item',
  templateUrl: './register-item.component.html',
  styleUrls: ['./register-item.component.scss'],
})
export class RegisterItemComponent implements OnInit {
  itemGroup: FormGroup = new FormGroup({})

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm(new ItemModel)
  }

  createForm(itemModel: ItemModel): void {
    this.itemGroup = this.formBuilder.group({
      id: [null],
      name: [itemModel.name],
      unit_price: [itemModel.unit_price],
      category: [itemModel.category],
      quantity: [itemModel.quantity],
    })
  }
}
