import { UpdateCategoryInput } from './dto/update-category.input';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { CreateCategoryInput } from './dto/create-category.input';
import { Category } from './entities/categories.entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: EntityRepository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll({
      orderBy: { id: 'DESC' },
    });
    return categories;
  }

  findOne(categoryId: number): Promise<Category> {
    return this.findCategoryById(categoryId);
  }

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    try {
      let category = new Category(
        createCategoryInput.name,
        createCategoryInput.image,
      );
      category = this.categoryRepository.create(category);
      //  Entity Manager (Persist data)
      // await this.categoryRepository.persistAndFlush(category);
      await this.categoryRepository.flush();
      return category;
    } catch (err) {
      throw new ConflictException();
    }
  }

  async update(updateCategoryInput: UpdateCategoryInput): Promise<Category> {
    const category = await this.findCategoryById(updateCategoryInput.id);
    wrap(category).assign({ name: updateCategoryInput.name });
    //  Entity Manager (Find diff and update)
    await this.categoryRepository.flush();
    return category;
  }

  private async findCategoryById(categoryId: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ id: categoryId });

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }
}
