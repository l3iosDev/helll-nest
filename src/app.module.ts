import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [MikroOrmModule.forRoot(), CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
