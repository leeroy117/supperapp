import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ApikeyService } from './guards/apikey/apikey.service';
import { APP_GUARD } from '@nestjs/core';
import { ApikeyGuard } from './guards/apikey/apikey.guard';
import "reflect-metadata"
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKey } from './entity/apikey.entity';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { OfertaEducativaModule } from './oferta-educativa/oferta-educativa.module';
dotenv.config();

@Module({
  imports: [
      DatabaseModule,
      OfertaEducativaModule,
      // TypeOrmModule.forRoot({
      //   type: 'mysql',
      //   host: 'localhost',
      //   port: parseInt(process.env.MYSQL_PORT),
      //   username: process.env.MYSQL_USER,
      //   password: process.env.MYSQL_PASSWORD,
      //   database: process.env.MYSQL_DATABASE,
      //   entities: [ApiKey],
      //   synchronize: false,
      //   connectorPackage: 'mysql2'
      // })
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    ApikeyService,
    {
      provide: APP_GUARD,
      useClass: ApikeyGuard
    }
  ],
})
export class AppModule {}
