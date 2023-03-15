import { Injectable } from '@nestjs/common';
import { Category } from './entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository,DeleteResult, UpdateResult } from 'typeorm';
@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
      ) {}
      async findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
      }
    
      async findById(id: number): Promise<Category> {
        return this.categoryRepository.findOne({where:{id}});
      }
    
      async create(category: Category): Promise<Category> {
        return this.categoryRepository.save(category);
      }
    
      async update(id: number, category: Category): Promise<Category> {
        await this.categoryRepository.update(id, category);
        return this.findById(id);
      }
    
      async delete(id: number): Promise<void> {
        await this.categoryRepository.delete(id);
      }
    }

