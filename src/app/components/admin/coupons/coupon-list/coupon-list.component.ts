import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../../../service/coupon.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { CouponDto } from '../../../../model/CouponDto';

@Component({
  selector: 'app-coupon-list',
  standalone: false,
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css']
})
export class CouponListComponent implements OnInit {
  displayedColumns: string[] = ['code', 'discountAmount', 'expirationDate', 'quantity', 'usedCount', 'userId', 'actions'];
  coupons: CouponDto[] = [];
  totalItems = 0;
  pageIndex = 0;
  pageSize = 5;
  searchTerm = '';

  constructor(private couponService: CouponService, private router: Router) {}

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons(): void {
    this.couponService.getCouponsPaged(this.pageIndex + 1, this.pageSize, this.searchTerm).subscribe(result => {
      this.coupons = result.items;
      this.totalItems = result.totalCount;
    });
  }

  onSearchChange(): void {
    this.pageIndex = 0;
    this.loadCoupons();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCoupons();
  }

  onAdd(): void {
    this.router.navigate(['/admin/coupons/form']);   
  }

  onDelete(id: number): void {
    Swal.fire({
      title: '¿Eliminar cupón?',
      text: `¿Estás seguro de eliminar este cupón?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.couponService.deleteCoupon(id).subscribe(() => {
          Swal.fire('Eliminado', 'Cupón eliminado correctamente.', 'success');
          this.loadCoupons();
        });
      }
    });
  }
}
