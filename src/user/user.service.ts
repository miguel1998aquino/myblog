import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dtos';
import { User } from './entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getMany() {
    return await this.userRepository.find();
  }

  async getOne(id) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('El ususario no existe');

    return user;
  }
  async createOne(dto: CreateUserDto) {
    const userExist = await this.userRepository.findOne({ email: dto.email });
    if (userExist) throw new BadRequestException('el email ya esta en uso');
    const newUser = this.userRepository.create(dto);
    const user = await this.userRepository.save(newUser);
    delete user.password;
    return user;
  }

  async editOne(id: number, dto: EditUserDto) {
    const user = await this.getOne(id);
    const editedUser = Object.assign(user, dto);
    const usuario = await this.userRepository.save(editedUser);
    delete usuario.password;
    return usuario;
  }

  async deleteOne(id: number) {
    const user = await this.getOne(id);
    return await this.userRepository.remove(user);
  }
}
