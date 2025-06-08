export class ShoppingcartitemDto {
  id: number;
  shoppingCartId: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  active: boolean;
  addedAt: Date;
}