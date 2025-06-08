export class ProductreviewDto {
  id: number;
  productId: number | null;
  userId: number | null;
  rating: number | null;
  comment: string;
  reviewDate: Date | null;
  productName: string;
  userFullName: string;
}