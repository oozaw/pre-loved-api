import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/decorator';
import { EditDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getUser(@GetUser('id') userId: number) {
    return this.userService.getUser(userId);
  }

  @Put()
  editUser(@GetUser('id') userId: number, @Body() dto: EditDto) {
    return this.userService.editUser(userId, dto);
  }
}
