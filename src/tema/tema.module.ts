import { Module } from '@nestjs/common';
import { Tema } from './entities/tema.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemaController } from './controller/tema.controller';
import { TemaService } from './service/tema.service';


@Module({
    imports: [TypeOrmModule.forFeature([Tema])],
    controllers: [TemaController],
    providers: [TemaService],
    exports: [TypeOrmModule]
})
export class TemaModule {};