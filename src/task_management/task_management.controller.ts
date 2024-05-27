import { Body, Controller,Post,Patch, Param, Get, UseGuards, Delete} from '@nestjs/common';
import { TaskManagementService } from './task_management.service';
import { TaskDto, UpdateTaskStatusDTO } from './dto/task_management.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('task')
export class TaskManagementController {
    constructor(
        private TaskManagementService:TaskManagementService
    ){}

    @UseGuards(JwtGuard)
    @Post()
    createNewTask(@Body() TaskDto:TaskDto){
        return this.TaskManagementService.createNewTask(TaskDto)
    }

    @UseGuards(JwtGuard)
    @Patch('update-status')
    updateTaskStatus(@Body() UpdateTaskStatusDTO: UpdateTaskStatusDTO){
        return this.TaskManagementService.updateStatus(UpdateTaskStatusDTO);
    }

    @UseGuards(JwtGuard)
    @Get(':userID/:taskID')
    getTaskByID(
        @Param('userID') userID:string,
        @Param('taskID') taskID:string
    ){
        return this.TaskManagementService.getTaskByID(userID,taskID)
    }

    @UseGuards(JwtGuard)
    @Get(':userID')
    getAllTasks(@Param('userID') userID:string){
        return this.TaskManagementService.getAllTasks(userID)
    }

    @UseGuards(JwtGuard)
    @Get('status/:userID/:status')
    getTasks(
        @Param('userID') userID:string,
        @Param('status') status:string,
    ){
        return this.TaskManagementService.getAllTaskByStatus(userID,status)
    }

    @UseGuards(JwtGuard)
    @Delete(':userID/:taskID')
    deleteTask(
        @Param('userID') userID:string,
        @Param('taskID') taskID:string,
    ){
        return this.TaskManagementService.deletetask(userID,taskID);
    }

    @UseGuards(JwtGuard)
    @Get('search/:userID/:searchParam')
    searchQuery(
        @Param('userID') userID:string,
        @Param('searchParam') searchParam:string
    ){
        return this.TaskManagementService.searchTask(userID, searchParam);
    }
}