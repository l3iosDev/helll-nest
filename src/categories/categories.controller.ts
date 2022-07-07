import { CategoryParamDto } from './dto/category-param.dto';
import { CategoryDto } from './dto/category.dto';
import { CategoriesService } from './categories.service';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { MyResponse } from 'src/shared/interfaces/response.interface';
import { Delete } from '@nestjs/common';
import { Query } from '@nestjs/common';

@Controller({
  path: 'categories',
  version: '1',
})
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(): Promise<MyResponse> {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MyResponse> {
    const category = await this.categoriesService.findOne(+id);
    return {
      success: true,
      data: category,
    };
  }

  @Post()
  async create(@Body() categoryDto: CategoryDto): Promise<MyResponse> {
    const category = await this.categoriesService.create(categoryDto);
    return {
      success: true,
      data: category,
    };
  }

  @Patch(':id')
  async update(
    @Param() categoryParamDto: CategoryParamDto,
    @Body() categoryDto: CategoryDto,
  ): Promise<MyResponse> {
    const category = await this.categoriesService.update(
      +categoryParamDto.id,
      categoryDto,
    );
    return {
      success: true,
      data: category,
    };
  }

  @Delete(':id')
  delete(@Param() categoryParamDto: CategoryParamDto) {
    return this.categoriesService.delete(+categoryParamDto.id);
  }
}
