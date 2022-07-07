import { UpdateCategoryInput } from './dto/update-category.input';
import { CategoriesService } from './categories.service';
import { Category } from './entities/categories.entities';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCategoryInput } from './dto/create-category.input';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [Category])
  findAllCategory() {
    return this.categoriesService.findAll();
  }

  @Query(() => Category)
  async findOneCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Mutation(() => Category)
  createCategory(
    @Args('createCategoryArgs') createCategoryArgs: CreateCategoryInput,
  ) {
    return this.categoriesService.create(createCategoryArgs);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('updateCategoryArgs') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoriesService.update(updateCategoryInput);
  }
}
