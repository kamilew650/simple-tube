import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [TypegooseModule.forRoot('mongodb://mongo/smart_reach_tech')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
