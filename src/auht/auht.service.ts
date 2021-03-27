import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcryptjs';
import { User } from 'src/user/entities';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuhtService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ email });
    if (user && (await compare(pass, user.password))) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }
  login(user: User) {
    const { id, ...rest } = user;
    const payload = { sub: id };

    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
