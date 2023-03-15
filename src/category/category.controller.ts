import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Category } from './entity/category.entity';
import { CategoryService } from './category.service';
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findById(id);
  }

  @Post()
  async create(@Body() category: Category): Promise<Category> {
    return this.categoryService.create(category);
  }

}
