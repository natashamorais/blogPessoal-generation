import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";


@Controller("/postagens")
export class PostagemController{

constructor(private readonly postagemService: PostagemService) { }

@Get()
@HttpCode(HttpStatus.OK)
findAll(): Promise<Postagem []>{
    return this.postagemService.findAll()
}

@Get('/:id')
@HttpCode(HttpStatus.OK)
findById(@Param('id', ParseIntPipe)id: number): Promise<Postagem>{
    return this.postagemService.findById(id);
}

@Get('texto/:texto')
@HttpCode(HttpStatus.OK)
findByTexto(@Param('texto') texto: string): Promise<Postagem []>{
    return this.postagemService.findByTexto(texto);
}
@Post()
@HttpCode(HttpStatus.CREATED)
post(@Body() postagem: Postagem): Promise<Postagem>{
    return this.postagemService.put(postagem);
}
@Put()
@HttpCode(HttpStatus.OK)
put(@Body() postagem: Postagem): Promise<Postagem>{
    return this.postagemService.put(postagem);
}

@Delete('/:id')
@HttpCode(HttpStatus.NO_CONTENT)
delete(@Param ('id', ParseIntPipe)id: number){
    return this.postagemService.delete(id);
}


}