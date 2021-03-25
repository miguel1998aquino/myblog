import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators';
import { User as UserEntity } from 'src/user/entities';
import { LocalAuthGuard } from './guards/local-auht.guard';

@Controller('auht')
export class AuhtController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@User() user: UserEntity) {
    return user;
  }

  @Get('profile')
  profile() {
    return 'estos son tus datos';
  }
}
