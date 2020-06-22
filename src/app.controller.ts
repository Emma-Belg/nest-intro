import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  //this is dependency injection in action (this is possible b/c we listed AppService as a provier in the @Module decorator in app.module.ts)
  //unlike in Angular, services are not available globally but scoped to the module
  //it is important to typehint the argument
  //there is no need for appService = new AppService when you write it in the constructor this way
  constructor(private readonly appService: AppService) {}

  //this @Get() decorator refers to the HTTP request,you could use any HTTP request as a decorator (POST, PUT, DELETE, PATCH)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
