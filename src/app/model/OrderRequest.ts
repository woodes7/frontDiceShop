import { BillingaddressDto } from "./BillingaddressDto";

export interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderRequest {
  items: OrderItem[];
  totalAmount: number;
  billingAddress: BillingaddressDto;
}
