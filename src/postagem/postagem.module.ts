import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from './entities/postagem.entity';
import { PostagemService } from './services/postagem.service';
import { PostagemController } from './controller/postagem.controller';
import { TemaModule } from 'src/tema/tema.module';
import { TemaService } from 'src/tema/services/tema.service';
import { UsuarioModule } from 'src/usuario/usuario.module';


@Module({
    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule, UsuarioModule],
    providers: [PostagemService, TemaService],
    controllers: [PostagemController],
    exports:[TypeOrmModule]
})
export class PostagemModule {}