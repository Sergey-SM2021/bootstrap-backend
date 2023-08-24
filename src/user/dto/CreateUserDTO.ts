import { IsNumber, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  login: string;
  @IsString()
  password: string;
  @IsString()
  name: string;
  @IsString()
  avatar: string;
  @IsNumber()
  age: number;
  @IsString()
  city: string;
  @IsString()
  country: string;
  @IsString()
  currency: string;
  @IsString()
  nickname: string;
  @IsString()
  lastname: string;
}
