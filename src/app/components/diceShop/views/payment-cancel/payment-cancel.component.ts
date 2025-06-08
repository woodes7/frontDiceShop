import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-cancel',
  standalone: false,
  templateUrl: './payment-cancel.component.html',
  styleUrl: './payment-cancel.component.css'
})
export class PaymentCancelComponent {

  constructor(
    private router: Router
  ) {}

goHome(): void {
    this.router.navigate(['/']);
  }
}
