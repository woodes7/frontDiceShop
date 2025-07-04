import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { CategoryService } from '../../../service/category.service';
import { MatPaginator } from '@angular/material/paginator';
import { ProductDto } from '../../../model/ProductDto';
import { CategoryDto } from '../../../model/CategoryDto';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: ProductDto[] = [];
  categories: CategoryDto[] = [];
  selectedCategory: string = '';
  searchTerm: string = '';
  totalItems = 0;
  pageSize = 6;
  pageNumber = 1;
  discount = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadProducts(): void {
    this.productService.getProducts(this.pageNumber, this.pageSize, this.selectedCategory, this.searchTerm)
      .subscribe(result => {

        this.products = result.items;
        this.totalItems = result.totalCount;

      });
  }
  getDiscountedPrice(product: ProductDto): number {
    if (!product.discount || !product.discount.active) {
      return product.price ?? 0;
    }

    const discount = product.discount;

    if (discount.discountType === 'PERCENTAGE') {
      return (product.price ?? 0) * (1 - (discount.amount ?? 0) / 100);
    }

    if (discount.discountType === 'FIXED') {
      return Math.max((product.price ?? 0) - (discount.amount ?? 0), 0);
    }

    return product.price ?? 0;
  }

  onCategoryChange(): void {
    this.pageNumber = 1;
    this.paginator.firstPage();
    this.loadProducts();
  }

  onSearchChange(): void {
    this.pageNumber = 1;
    this.paginator.firstPage();
    this.loadProducts();
  }

  onPageChange(event: any): void {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }



}
