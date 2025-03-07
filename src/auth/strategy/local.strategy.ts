﻿import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from '../services/auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'usuario',
      passwordField: 'senha'
    });
  }

  async validate(username: string, password: string): Promise<any> {

    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new HttpException('Acesso não autorizado!', HttpStatus.UNAUTHORIZED)
    }
    
    return user;
  }
}