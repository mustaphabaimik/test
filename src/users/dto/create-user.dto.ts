import { IsEmail, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  readonly firstName: string;
  @IsString()
  readonly lastName: string;
  @IsEmail()
  readonly email: string;
}
