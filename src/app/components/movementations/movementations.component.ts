import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { ItemModel } from 'src/app/models/item-model'

@Component({
  selector: 'app-movementations',
  templateUrl: './movementations.component.html',
  styleUrls: ['./movementations.component.scss'],
})
export class MovementationsComponent implements OnInit {
  itemId!: string

  constructor(private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.itemId = param['id']
    })
  }
}
