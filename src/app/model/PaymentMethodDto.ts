export class PaymentMethodDto {
  id: number;
  userId: number | null;
  paymentType: string;
  paymentDetails: string;
  creationDate: Date | null;
  isPrimary: boolean | null;
  userFullName: string;
}