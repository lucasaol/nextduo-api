import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from "../../application/services/user.service";

@Controller('user')
export class UserController {

  constructor(private readonly service: UserService) {}


}
