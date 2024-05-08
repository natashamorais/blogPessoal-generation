import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';


@Module({
  imports: [
	ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
     
    }),
PostagemModule,
AuthModule
  ],
  
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
