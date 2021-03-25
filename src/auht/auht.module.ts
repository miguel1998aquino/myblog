import { Module } from '@nestjs/common';
import { AuhtService } from './auht.service';
import { AuhtController } from './auht.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy, JwtStrategy } from './strategies';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET } from 'src/config/constants';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(JWT_SECRET),
        signOptions: { expiresIn: '60m' },
      }),
    }),
    UserModule,
  ],
  providers: [AuhtService, LocalStrategy, JwtStrategy],
  controllers: [AuhtController],
})
export class AuhtModule {}
