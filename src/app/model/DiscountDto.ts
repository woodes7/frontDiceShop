export class DiscountDto {
  id: number;
  code: string;
  amount: number | null;
  discountType: string;
  startDate: Date | null;
  endDate: Date | null;
  active: boolean | null;
}