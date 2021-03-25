import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuhtService } from '../auht.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuhtService) {
    super({
      usernameField: 'email', //'username
      passwordField: 'password', //'passport
    });
  }

  async validate(email: string, password: string) {
    console.log(email, password);
    const user = await this.authService.validateUser(email, password);
    if (!user)
      throw new UnauthorizedException('las credenciales no son validas');

    return user;
  }
}
