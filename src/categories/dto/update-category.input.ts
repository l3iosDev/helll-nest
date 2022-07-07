import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateCategoryInput {
  @Field()
  @IsNumber()
  id: number;

  @Field()
  @IsString()
  name: string;
}

// export class UpdateCategoryInput extends PartialType(UpdateCategoryInput) {}
