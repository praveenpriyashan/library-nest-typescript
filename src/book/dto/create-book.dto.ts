import { Category } from '../schemas/book.schema';
import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';

export class CreateBookDto {

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsEnum(Category,{message:'plsease enter the correct category'})
  readonly category: Category;

  @IsEmpty({message:'you canot passs the user id'})
  readonly user:User
}