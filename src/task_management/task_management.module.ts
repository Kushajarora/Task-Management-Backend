import { Module } from '@nestjs/common';
import { TaskManagementService } from './task_management.service';
import { TaskManagementController } from './task_management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task,TaskSchema  } from 'src/schemas/tasks.schema';
import { UserDetails,userDetailsSchema  } from 'src/schemas/user.schema';
import { Project, ProjectSchema } from 'src/schemas/project.schema';


@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema
      }
    ]),
    MongooseModule.forFeature([
      {
        name: UserDetails.name,
        schema: userDetailsSchema
      }
    ]),
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema
      }
    ]),
      
  ],
  providers: [TaskManagementService],
  controllers: [TaskManagementController]
})
export class TaskManagementModule {}
