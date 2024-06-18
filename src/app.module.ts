import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {MongooseModule} from '@nestjs/mongoose'
import { TaskManagementModule } from './task_management/task_management.module';
import { ProjectsModule } from './projects/projects.module';
import { KafkaModule } from './common/kafka/kafka.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/colloborate'),
    AuthModule,
    TaskManagementModule,
    ProjectsModule,
    KafkaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
