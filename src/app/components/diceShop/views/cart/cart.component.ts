import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../../service/shopping-cart.service';
import { ShoppingCartItemService } from '../../../../service/shopping-cart-item.service';
import { ShoppingcartDto } from '../../../../model/ShoppingcartDto';
import { ShoppingcartitemDto } from '../../../../model/ShoppingcartitemDto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: ShoppingcartDto | null = null;
  items: ShoppingcartitemDto[] = [];
  total: number = 0;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private shoppingCartItemService: ShoppingCartItemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = sessionStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : 0;

    this.shoppingCartService.getShoppingCartByUserId(userId).subscribe({
      next: (response) => {
        if (response)
          this.getItemsOfCart(response.id);
      }
    });
  }

  getItemsOfCart(cartId: number) {
    this.shoppingCartItemService.getItemsByCartId(cartId).subscribe({
      next: (response) => {
        console.log(response)
        this.items = response;
        this.calculateTotal();
      }
    });
  }

  toggleSelection(item: ShoppingcartitemDto): void {
    item.active = !item.active;

    this.shoppingCartItemService.updateItem(item).subscribe(success => {
      if (success) {
        this.calculateTotal();
      }
    });
  }

  isSelected(item: ShoppingcartitemDto): boolean {
    return item.active;
  }

  get selectedItems(): ShoppingcartitemDto[] {
    return this.items.filter(i => i.active);
  }


  changeQuantity(item: ShoppingcartitemDto, delta: number): void {
    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) return;

    item.quantity = newQuantity;

    this.shoppingCartItemService.updateItem(item).subscribe({
      next: (response) => {
        if (response && item.active) {
          this.calculateTotal();
        }
      }
    });
  }


  deleteItem(item: ShoppingcartitemDto): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar "${item.productName}" del carrito?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.shoppingCartItemService.deleteItem(item.id!).subscribe({
          next: (success) => {
            if (success) {
              this.items = this.items.filter(i => i.id !== item.id);
              this.calculateTotal();
              this.confirmationDeleteMessage();
            }
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
          }
        });
      }
    });
  }

  confirmationDeleteMessage() {
    Swal.fire({
      title: 'Eliminado',
      text: 'El producto ha sido eliminado del carrito.',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });
  }

  calculateTotal(): void {
    this.total = this.items
      .filter(item => item.active)
      .reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }

  returnStore() {
    this.router.navigate(['']);
  }

  goToOrder(): void {
    this.router.navigate(['/views/order']);
  }
}
