import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from '@infra/entity/book/book.entity';
import { BookRepository } from './book.repository';
import { UtilsModule } from '@infra/utils/utils.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    UtilsModule,
  ],
  providers: [BookRepository],
  exports: [BookRepository],
})
export class BookRepositoryModule {}
