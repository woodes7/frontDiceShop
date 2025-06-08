import { OrderDetailDto } from "./OrderdetailDto";

export class OrderDto {
  id: number;
  userId: number;
  totalAmount: number;
  billingAddress: string;
  orderDate: Date;
  orderStatus: string;
  orderDetails: OrderDetailDto[];
  userFullName: string;
}
