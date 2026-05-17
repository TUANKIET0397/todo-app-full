import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  email: string;
  password: string;
  phone: string;
  address: string;
  image: string;
}
