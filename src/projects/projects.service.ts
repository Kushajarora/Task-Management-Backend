import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from 'src/schemas/project.schema';
import { Model } from 'mongoose';
import { Task } from 'src/schemas/tasks.schema';
import { UserDetails } from 'src/schemas/user.schema';
import { ProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Task.name) private taskDetailsModel: Model<Task>,
        @InjectModel(UserDetails.name) private userDetailsModel: Model<UserDetails>,
        @InjectModel(Project.name) private projectDetailsModel: Model<Project>,
    ){}

    async createProject(ProjectDto: ProjectDto){
        const newRepo=new this.projectDetailsModel(ProjectDto);
        return await newRepo.save()
    }

    async fetchProjects(){
        return this.projectDetailsModel.find();
    }
    
    async fetchProject(ProjectName:string){
        return this.projectDetailsModel.findOne({
            project_name: ProjectName
        });
    }

    async fetchAuthUsers(ProjectName:string){
        const project= await this.projectDetailsModel.findOne({
            project_name: ProjectName
        }).populate('users').exec();
        console.log(project)
        return project.users;
    }

    async fetchTask(ProjectName: string){
        const project=await this.projectDetailsModel.findOne({
            project_name: ProjectName
        }).populate('tasks').exec();
        return project.tasks;
    }
}
