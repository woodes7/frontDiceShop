export class ProductDto {
  id: number;
  name: string;
  description: string;
  price: number | null;
  stock: number | null;
  categoryId: number | null;
  image: Blob;
  creationDate: Date | null;
  active: boolean | null;
  releaseDate: Date | null;
  discountId: number | null;
  categoryName: string;
  discountCode: string;
}