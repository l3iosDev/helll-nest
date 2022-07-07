import { Category } from './entities/categories.entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';

@Module({
  imports: [MikroOrmModule.forFeature([Category])],
  providers: [CategoriesResolver, CategoriesService],
})
export class CategoriesModule {}
