import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDto } from '../../../../model/CategoryDto';
import { CategoryService } from '../../../../service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-form',
  standalone: false,
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categryService: CategoryService,
    private router: Router
  ) {
    this.loadForm(new CategoryDto());
  }

  loadForm(category: CategoryDto){
    this.form = this.fb.group({
      name: [category.name, Validators.required],
      description: [category.description]
    });
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    this.id = param ? +param : null;
    this.isEdit = this.id !== null;

    if (this.isEdit) {
      this.getCategory(this.id!);
    }else
      this.loadForm(new CategoryDto());
  }
  
  getCategory(id: number){
    this.categryService.getCategoryById(id).subscribe(
      {
        next:(respose) => {
          this.loadForm(respose)
        }
      }
    );
  }

  getCategoryForm(): CategoryDto{
    let category: CategoryDto = new CategoryDto();
    category.name = this.form.controls["name"].value;
    category.description = this.form.controls["description"].value;
    return category;
  }

  onSubmit(): void {
    let category: CategoryDto = this.getCategoryForm();
    if (this.form.valid) {
      if (this.isEdit) {
        category.id = this.id!;
        this.update(category)
      } else {
        this.add(category);
      }
    }
  }
  
  add(category: CategoryDto){
    this.categryService.addCategory(category).subscribe(
      {
        next:(respose)=> {
          if(respose)
            Swal.fire('Creado', 'La categoría se ha creado correctamente.', 'success')
            .then(() => this.router.navigate(['/admin/categories']));
        }
      }
    );
  }
                                                                                                                                                                                                                                                                                    
  update(category: CategoryDto){
    this.categryService.updateCategory(category).subscribe(
          {
            next:(respose)=> {
              if(respose)
                Swal.fire('Actualizado', 'La categoría se ha actualizado correctamente.', 'success')
                  .then(() => this.router.navigate(['/admin/categories']));
            }
          }
        );
  }

  onBack(): void {
  this.router.navigate(['/admin/categories']);
}
}
