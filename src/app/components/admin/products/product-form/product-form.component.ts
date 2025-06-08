import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDto } from '../../../../model/ProductDto';
import { ProductService } from '../../../../service/product.service';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../../service/category.service';
import { CategoryDto } from '../../../../model/CategoryDto';
import { DiscountService } from '../../../../service/discount.service';
import { DiscountDto } from '../../../../model/DiscountDto';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.component.html'  
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  id: number | null = null;
  imagePreview: any | null = null;
  categories: CategoryDto[];
  discounts: DiscountDto[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private discountService: DiscountService
  ) {
    this.loadForm(new ProductDto());
  }

  loadForm(product: ProductDto): void {
    this.form = this.fb.group({
      name: [product.name, Validators.required],
      description: [product.description],
      price: [product.price],
      stock: [product.stock],
      categoryId: [product.categoryId],
      image: [product.image],
      creationDate: [product.creationDate],
      active: [product.active],
      releaseDate: [product.releaseDate],
      discountId: [product.discountId]
    });
    this.imagePreview = product.image;
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    this.id = param ? +param : null;
    this.isEdit = this.id !== null;
    this.getCategories();
    

    if (this.isEdit) {
      this.getProduct(this.id!);
    } else {
      this.loadForm(new ProductDto());
    }
  }

  getProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      {
        next: (response) =>{
          console.log(response)
          this.loadForm(response)
        }
      }
    );
  }

    getDiscounts(): void {
    this.discountService.getDiscounts().subscribe(
      {
        next: (response) =>{
          this.discounts = response;
        }
      }
    );
  }

    getCategories(): void {
    this.categoryService.getCategories().subscribe(
      {
        next: (response) =>{
          this.categories = response;
          this.getDiscounts();
        }
      }
    );
  }

  getProductForm(): ProductDto {
    const product = new ProductDto();
    product.name = this.form.controls['name'].value;
    product.description = this.form.controls['description'].value;
    product.price = this.form.controls['price'].value;
    product.stock = this.form.controls['stock'].value;
    product.categoryId = this.form.controls['categoryId'].value;
    product.image = this.form.controls['image'].value;
    product.creationDate = this.form.controls['creationDate'].value;
    product.active = this.form.controls['active'].value;
    product.releaseDate = this.form.controls['releaseDate'].value;
    product.discountId = this.form.controls['discountId'].value;
    return product;
  }

  onSubmit(): void {
    const product = this.getProductForm();
    if (this.form.valid) {
      if (this.isEdit) {
        product.id = this.id!;
        this.update(product);
      } else {
        this.add(product);
      }
    }
  }

  add(product: ProductDto): void {
    this.productService.addProduct(product).subscribe({
      next: (response) => {
        if (response)
          Swal.fire('Creado', 'El producto se ha creado correctamente.', 'success')
            .then(() => this.router.navigate(['/admin/products']));
      }
    });
  }

  update(product: ProductDto): void {
    this.productService.updateProduct(product).subscribe({
      next: (response) => {
        if (response)
          Swal.fire('Actualizado', 'El producto se ha actualizado correctamente.', 'success')
            .then(() => this.router.navigate(['/admin/products']));
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/admin/products']);
  }

    onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        this.form.get('image')?.setValue(base64);
        this.imagePreview = base64;
      };
      reader.readAsDataURL(file);
    }
  }

}
