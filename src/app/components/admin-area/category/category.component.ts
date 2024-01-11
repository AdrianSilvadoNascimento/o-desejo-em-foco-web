import { Component, OnInit } from '@angular/core';

import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { CategoryModel } from '../../../../app/models/category-model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryList: CategoryModel[] = []
  displayedColumns: string[] = ['name', 'created_at', 'updated_at', 'action_buttons']
  faTrash = faTrash
  faPen = faPen

  constructor(private utilService: UtilsService) {}

  ngOnInit(): void {
    this.fetchCategories()
  }

  fetchCategories(): void {
    this.utilService.fetchCategories().subscribe(categories => {
      this.categoryList = categories
    })
  }

  deleteCategory(categoryId: string): void {
    const isDeleting = confirm('Deseja excluir esta categoria?')
    if (isDeleting) {
      this.utilService.deleteCategory(categoryId).subscribe(() => {
        this.fetchCategories()
      }, err => {
        console.error(err)
      })
    }
  }
}
