export class BillingaddressDto {
  id: number;
  userId: number | null;
  country: string;
  state: string;
  city: string;
  street: string;
  streetNumber: string;
  door: string;
  block: string;
  floor: string;
  postalCode: string;
  isPrimary: boolean | null;
  creationDate: Date | null;
  userFullName: string;
}