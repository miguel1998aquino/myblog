import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, User } from 'src/common/decorators';
import { User as UserEntity } from 'src/user/entities';
import { AuhtService } from './auht.service';
import { LoginDto } from './dtos/login.dto';
import { LocalAuthGuard } from './guards';

@ApiTags('Auth routes')
@Controller('auht')
export class AuhtController {
  constructor(private readonly auhtService: AuhtService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() loginDto: LoginDto, @User() user: UserEntity) {
    const data = this.auhtService.login(user);
    return {
      mensaje: 'login exitoso',
      data,
    };
  }
  @Auth()
  @Get('profile')
  profile(@User() user: UserEntity) {
    return {
      mensaje: 'peticion correcta',
      user,
    };
  }

  @Auth()
  @Get('refresh')
  refreshToken(@User() user: UserEntity) {
    const data = this.auhtService.login(user);
    return {
      mensaje: 'Refresh exitoso',
      data,
    };
  }
}
