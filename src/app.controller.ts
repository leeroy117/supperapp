import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/public_access';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Public()
  @Get('database')
  testDatabase(): string {
    return this.appService.testDatabase();
  }
}
