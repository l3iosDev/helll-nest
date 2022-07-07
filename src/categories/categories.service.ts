import { CategoryResponse } from './interfaces/category-response.interface';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MyResponse } from 'src/shared/interfaces/response.interface';
import { CategoryDto } from './dto/category.dto';
import { Category } from './entities/categories.entities';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: EntityRepository<Category>,
  ) {}
  async findAll(): Promise<MyResponse> {
    const categories = await this.categoryRepository.findAll({
      orderBy: { id: 'DESC' },
    });

    const response = categories.map((category) =>
      this.buildCategoryResponse(category),
    );

    return { success: true, data: response };
  }

  async findOne(categoryId: number): Promise<{
    id: number;
    name: string;
    createdAt: Date;
  }> {
    const { updatedAt, ...rest } = await this.findCategoryById(categoryId);
    return rest;
  }

  async create(categoryDto: CategoryDto): Promise<Category> {
    const data = new Category(categoryDto.name);
    const category = this.categoryRepository.create(data);
    await this.categoryRepository.persistAndFlush(category);
    return data;
  }

  async update(
    categoryId: number,
    categoryDto: CategoryDto,
  ): Promise<Category> {
    const category = await this.findCategoryById(categoryId);

    wrap(category).assign({
      name: categoryDto.name,
    });

    await this.categoryRepository.flush();

    return category;
  }

  async delete(categoryId: number): Promise<MyResponse> {
    const category = await this.findCategoryById(categoryId);

    await this.categoryRepository.removeAndFlush(category);

    return {
      success: true,
      data: null,
    };
  }

  private async findCategoryById(categoryId: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ id: categoryId });

    if (!category) {
      throw new HttpException(
        { success: false, error: 'category not found' } as MyResponse,
        HttpStatus.NOT_FOUND,
      );
    }
    return category;
  }

  private buildCategoryResponse(category: Category): CategoryResponse {
    return {
      id: category.id,
      name: category.name,
    };
  }
}
