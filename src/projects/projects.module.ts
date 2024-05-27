import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
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
    ])  
  ],

  providers: [ProjectsService],
  controllers: [ProjectsController]
})
export class ProjectsModule {}
