import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, User } from 'src/common/decorators';
import { CreateUserDto, EditUserDto, UserRegistrationDto } from './dtos';
import { UserService } from './user.service';
import { RolesBuilder, InjectRolesBuilder } from 'nest-access-control';
import { AppResource, AppRoles } from 'src/app.roles';
import { User as UserEntity } from './entities';

@ApiTags('User routes')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}

  @Get()
  async getMany() {
    const data = await this.userService.getMany();
    return {
      data,
    };
  }

  @Post('register')
  async publicRegistration(@Body() dto: UserRegistrationDto) {
    const data = await this.userService.createOne({
      ...dto,
      roles: [AppRoles.AUTHOR],
    });
    return { mensaje: 'usuario registrado', data };
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    const data = await this.userService.getOne(id);
    return { data };
  }

  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResource.USER,
  })
  @Post()
  async createOne(@Body() dto: CreateUserDto) {
    const data = await this.userService.createOne(dto);
    return { mensaje: 'usuario creado', data };
  }

  @Auth({
    possession: 'own',
    action: 'update',
    resource: AppResource.USER,
  })
  @Put(':id')
  async editOne(
    @Param('id') id: number,
    @Body() dto: EditUserDto,
    @User() user: UserEntity,
  ) {
    let data;
    if (this.rolesBuilder.can(user.roles).updateAny(AppResource.USER).granted) {
      //esto es admin
      data = await this.userService.editOne(id, dto);
    } else {
      //esto es auhtor
      const { roles, ...rest } = dto;
      data = await this.userService.editOne(id, rest, user);
    }

    return { mensaje: 'editado con exito', data };
  }

  @Auth({
    action: 'delete',
    possession: 'own',
    resource: AppResource.USER,
  })
  @Delete(':id')
  async deleteOne(@Param('id') id: number, @User() user: UserEntity) {
    let data;
    if (this.rolesBuilder.can(user.roles).updateAny(AppResource.USER).granted) {
      //esto es admin
      data = await this.userService.deleteOne(id);
    } else {
      //esto es auhtor

      data = await this.userService.deleteOne(id, user);
    }

    return { mensaje: 'editado con exito', data };
  }
}
