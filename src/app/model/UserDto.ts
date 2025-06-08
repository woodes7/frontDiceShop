export class UserDto {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  password: string;
  registrationDate: Date | null;
}