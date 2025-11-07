import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from "../../application/services/user.service";
import { User } from "../../domain/user.entity";
import { CreateUserDto } from '../../request/create-user.dto';

@Controller('user')
export class UserController {

  constructor(private readonly service: UserService) {}

  @Get()
   async findAll(): Promise<User[]> {
    return await this.service.findAll();
  }

  @Post()
  async create(@Body() request: CreateUserDto) {
    return await this.service.create(request);
  }
}
