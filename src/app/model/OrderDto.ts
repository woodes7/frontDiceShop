export class OrderDto {
  id: number;
  userId: number | null;
  orderDate: Date | null;
  status: string;
  paymentMethodId: number | null;
  billingAddressId: number | null;
  userFullName: string;
}