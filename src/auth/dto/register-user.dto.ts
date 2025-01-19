import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
    message: 'Password must include uppercase, lowercase, and a number',
  })
  password: string;
}
