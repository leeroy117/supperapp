import { DatabaseSource } from './database/data-source';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {

  constructor(private databaseService: DatabaseService, private databaseSource: DatabaseSource){

  }

  getHello(): string {
    return 'Hello World!';
  }

  testDatabase(): string {
    // this.databaseService.getSSH()
    //   .then((data) => {
    //     console.log("🚀 ~ file: app.service.ts:18 ~ AppService ~ .then ~ data:", data);
    //   })
    //   .catch(err => console.log('err', err));

    this.databaseSource.createDatabaseConnection();
    return 'Hello World!';
  }
}
