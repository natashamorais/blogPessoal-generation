
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { TemaService } from "../../tema/services/tema.service"
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class PostagemService{
    findByTitulo(titulo: string): Promise<Postagem[]> {
        throw new Error('Method not implemented.');
    }
    create(postagem: Postagem): Promise<Postagem> {
        throw new Error('Method not implemented.');
    }
    update(postagem: Postagem): Promise<Postagem> {
        throw new Error('Method not implemented.');
    }

    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository <Postagem>,
        private temaService: TemaService
    ) { }

    async findAll(): Promise<Postagem[]>{
        return await this.postagemRepository.find({
        relations:{
            tema: true, 
            usuario: true
        }
        });
     
    }

    async findById( id: number): Promise<Postagem>{

        let postagem = await this.postagemRepository.findOne({
            where:{
                id
            },
            relations:{
                tema: true,
                usuario: true
            }
        });
        if (!postagem)
        throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    return postagem;
    }
async findByTexto(texto: string): Promise<Postagem[]>{
    return await this.postagemRepository.find({
        where:{
            texto:  ILike(`%${texto}%`)
        },
        relations:{
            tema: true,
            usuario: true
        }
    });

}

async post(postagem: Postagem): Promise<Postagem>{
    if (postagem.tema){
        let tema = await this.temaService.findById(postagem.tema.id)
        if(!tema)
            throw new HttpException('Tema não foi encontrado!', HttpStatus.NOT_FOUND)
        return await this.postagemRepository.save(postagem);
    }
    return await this.postagemRepository.save(postagem);
}

async put(postagem: Postagem): Promise<Postagem>{
    let buscaPostagem: Postagem = await this.findById(postagem.id);

    if (!buscaPostagem || !postagem.id)
        throw new HttpException('Postagem não foi encontrada!', HttpStatus.NOT_FOUND)
    if (postagem.tema){
        let tema = await this.temaService.findById(postagem.tema.id)
        if(!tema)
            throw new HttpException('Tema não foi encontrado!', HttpStatus.NOT_FOUND)
        return await this.postagemRepository.save(postagem);
    }

    return await this.postagemRepository.save(postagem);


}

async delete(id: number): Promise<DeleteResult>{

    let buscaPostagem = await this.findById(id);
    if(!buscaPostagem)
    throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
return await this.postagemRepository.delete(id);
}


}