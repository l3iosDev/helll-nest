import { IsNotEmpty } from 'class-validator';

export class CategoryParamDto {
  @IsNotEmpty()
  id: string;
}
