import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CategoryModel } from 'src/app/models/category-model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({})
  headerMessage: string = 'Cadastrar Categoria'
  save_button: string = 'Cadastrar'
  categoryId!: string
  faArrowLeft = faArrowLeft

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private utilService: UtilsService
  ) {
    this.activatedRoute.params.subscribe(param => {
      console.log('param:', param)
      this.categoryId = param['id']
    })
  }

  ngOnInit(): void {
    this.onPrepareForm(new CategoryModel())

    if (this.categoryId) {
      this.save_button = 'Salvar'
      
      this.utilService.getCategory(this.categoryId).subscribe(res => {
        this.headerMessage = `Editar Categoria: ${res.name}`
        this.populateUpdateForm(res)
      })
    }

    this.categoryForm.get('name')?.valueChanges.subscribe(name => {
      this.categoryForm.patchValue({
        value: this.toSnakeCase(name),
      })
    })
  }

  populateUpdateForm(categoryModel: CategoryModel) {
    this.categoryForm.patchValue({
      name: categoryModel.name,
      value: categoryModel.value,
    })
  }

  toSnakeCase(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '_');
  }

  return(): void {
    //TODO
  }

  onSubmit(): void {
    const categoryData = this.categoryForm.value

    if (this.categoryId) {
      this.onUpdateCategory(categoryData)
    } else {
      //TODO: Check this method to update correctly
      this.onRegisterCategory(categoryData)
    }
  }

  onRegisterCategory(categoryData: CategoryModel): void {
    this.utilService.registerCategory(categoryData).subscribe(() => {
      alert('Sucesso!')
      this.onPrepareForm(new CategoryModel())
    }, err => {
      console.error(err)
    })
  }
  
  onUpdateCategory(categoryModel: CategoryModel): void {
    this.utilService.updateCategory(categoryModel, this.categoryId).subscribe(() => {
      alert('Sucesso!')
    }, err => {
      console.error(err)
    })
  }

  onPrepareForm(categoryModel: CategoryModel): void {
    this.categoryForm = this.formBuilder.group({
      name: [categoryModel.name, Validators.required],
      value: [categoryModel.value, Validators.required],
    })
  }
}
