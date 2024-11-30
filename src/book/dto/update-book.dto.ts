import { Category } from '../schemas/book.schema';
import { IsEmpty, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';

export class UpdateBookDto {

  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsEnum(Category,{message:'plsease enter the correct category'})
  readonly category: Category;

  @IsEmpty({message:'you canot passs the user id'})
  readonly user:User
}