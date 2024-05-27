import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDto } from './dto/project.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('projects')
export class ProjectsController {
    constructor(
        private ProjectService:ProjectsService
    ){}

    @UseGuards(JwtGuard)
    @Post()
    createProject(
        @Body() ProjectDto: ProjectDto
    ){
        return this.ProjectService.createProject(ProjectDto);
    }

    @UseGuards(JwtGuard)
    @Get()
    getAllProjects(){
        return this.ProjectService.fetchProjects();
    }

    @UseGuards(JwtGuard)
    @Get(':projectName')
    getProjectByID(
        @Param('projectName') projectName:string
    ){
        return this.ProjectService.fetchProject(projectName);
    }

    @UseGuards(JwtGuard)
    @Get('users/:projectName')
    getAuthUsers(
        @Param('projectName') projectName: string
    ){
        return this.ProjectService.fetchAuthUsers(projectName);
    }

    @UseGuards(JwtGuard)
    @Get('tasks/:projectName')
    getTasks(
        @Param('projectName') projectName: string
    ){
        return this.ProjectService.fetchTask(projectName);
    }
}
