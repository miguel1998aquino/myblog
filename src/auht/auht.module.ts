import { Module } from '@nestjs/common';
import { AuhtService } from './auht.service';
import { AuhtController } from './auht.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies';
import { ConfigService } from '@nestjs/config';
import { JWT_TOKEN } from 'src/config/constants';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(JWT_TOKEN),
        signOptions: { expiresIn: '60s' },
      }),
    }),
    UserModule,
  ],
  providers: [AuhtService, LocalStrategy],
  controllers: [AuhtController],
})
export class AuhtModule {}
