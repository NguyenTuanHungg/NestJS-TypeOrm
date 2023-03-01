import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,DeleteResult,UpdateResult, FindOneOptions } from 'typeorm';
import { Book } from './entity/book.entity';
import {createBookDto} from './dto/create-book.dto'
@Injectable()
export class BookService {
    constructor(
    @InjectRepository(Book) private readonly bookRepo:Repository<Book>
    ){}
    async findAll(page: number = 1,
        limit: number = 13): Promise<{books:Book[];total:number}>{
            const [books, total] = await this.bookRepo.findAndCount({
                take: limit,
                skip: (page - 1) * limit,
              });
              return {
                books,
                total
                
              };
    }
    async create(createBookDto:createBookDto): Promise<Book>{
        const res=this.bookRepo.save(createBookDto)
        return res;
    }
    async findById(id:number): Promise<Book>{
        const book:Book=await this.bookRepo.findOne({where:{id}})
        if(!book){
            throw new NotFoundException('not found book')
        }
        return book;
    }
    // Update
    async UpdateById(id:number,book:Book): Promise<UpdateResult>{
        return await this.bookRepo.update(id,book)
    }
    
    // Delete
    async deleteById(id:number): Promise<DeleteResult>{
        return this.bookRepo.delete(id);
    }
    async searchByName(title: string): Promise<Book[]> {
        const queryBuilder = this.bookRepo.createQueryBuilder('Book');
     
        const book = await queryBuilder.where(`Book.title ILIKE :title`, { title: `%${title}%` }).getMany();
        return book;
      }

}
