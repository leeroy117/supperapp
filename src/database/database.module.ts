import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseSource } from './data-source';

@Module({
  providers: [DatabaseService, DatabaseSource],
  exports: [DatabaseService, DatabaseSource]
})
export class DatabaseModule {}
