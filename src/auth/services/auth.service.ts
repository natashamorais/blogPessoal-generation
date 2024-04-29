﻿import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../../usuario/services/usuario.service';
import { UsuarioLogin } from '../entities/usuariologin.entity';
import { Bcrypt } from '../bycript/bycript';
@Injectable()
export class AuthService {

    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ){}

    async validateUser(username: string, password: string): Promise<any> {

        const buscaUsuario = await this.usuarioService.findByUsuario(username);

        if(!buscaUsuario)
            throw new HttpException('Usuário não Encontrado!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.compararSenhas(buscaUsuario.senha, password)

        if(buscaUsuario && matchPassword) {
            const { senha, ...resposta } = buscaUsuario
            return resposta
        }

        return null
    }

    async login(usuarioLogin: UsuarioLogin){

        const payload = { 
            sub: usuarioLogin.usuario
        }

        const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario);

        if(!buscaUsuario)
            throw new HttpException('Usuário não Encontrado!', HttpStatus.NOT_FOUND)

        return{
            id: buscaUsuario.id,
            nome: buscaUsuario.nome,
            usuario: buscaUsuario.usuario,
            senha: '',
            foto: buscaUsuario.foto,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        }
    }

}