﻿
import { Module } from '@nestjs/common';
import { Bcrypt } from './bycript/bycript';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './controllers/auth.controller';


@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '1h'}
    })
  ],
  providers: [Bcrypt, AuthService, LocalStrategy,JwtStrategy],
  controllers: [AuthController],
  exports: [Bcrypt],
})
export class AuthModule { }