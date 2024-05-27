import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/schemas/tasks.schema';
import { Model } from 'mongoose';
import { TaskDto, UpdateTaskStatusDTO } from './dto/task_management.dto';
import { StatusDto } from 'src/common/enums/dto';
import { UserDetails } from 'src/schemas/user.schema';
import { Project } from 'src/schemas/project.schema';

@Injectable()
export class TaskManagementService {
    constructor(
        @InjectModel(Task.name) private taskDetailsModel: Model<Task>,
        @InjectModel(UserDetails.name) private userDetailsModel: Model<UserDetails>,
        @InjectModel(Project.name) private projectDetailsModel: Model<Project>
    ){}

    async createNewTask(TaskDto:TaskDto){
        try{
            const assignedToExist=await this.userDetailsModel.findOne({
                userID:TaskDto.assigned_person_id
            });
            if(!assignedToExist){
                throw new HttpException("Assigned Person Doesn't Exist",404);
            }
            const projectExist=await this.projectDetailsModel.findOne({
                project_name: TaskDto.project_name
            })
            if(!projectExist){
                throw new HttpException("Assigned Project Doesn't Exist",404);
            }
            const newTicket=new this.taskDetailsModel(TaskDto);
            await newTicket.save()
            await this.projectDetailsModel.findOneAndUpdate({
                project_name: TaskDto.project_name
            },
            { $push: { tasks: newTicket._id, users:assignedToExist._id },
            });

            return {
                State: true,
                task_id:newTicket.task_id
            }
        }
        catch(error){
            if(error.code=="11000"){
                throw new HttpException("Duplicate Task in the same Project",404);
            }
            throw error;
        }
    }
    
    async updateStatus(UpdateTaskStatusDTO: UpdateTaskStatusDTO): Promise<StatusDto>{
        const ticketdetails = await this.taskDetailsModel.findOne({
            task_id: UpdateTaskStatusDTO.task_id,
            user_id: UpdateTaskStatusDTO.user_id
        });
        if(!ticketdetails){
            throw new HttpException("Ticket Not Found",404);
        }
        ticketdetails.status=UpdateTaskStatusDTO.status;
        await ticketdetails.save()
        return{
            Status: true
        }
    }

    async getTaskByID(userID: string,task_id: string){
        const task= await this.taskDetailsModel.findOne({
            task_number: task_id,
        });
        return task;
    }

    async getAllTaskByStatus(userID: string,status: string){
        const allTasksByStatus=await this.taskDetailsModel.find({
            user_id: userID,
            status: status
        });
        return allTasksByStatus;
    }

    async getAllTasks(user_id: string){
        const tasks=await this.taskDetailsModel.find({
            user_id: user_id
        });
        return tasks;
    }

    async deletetask(userID: string,task_id: string): Promise<StatusDto>{
        const taskDetails=await this.taskDetailsModel.findOne({
            task_id: task_id,
            user_id: userID
        })
        if(!taskDetails){
            throw new HttpException("Ticket Not Found",404);
        }
        await this.projectDetailsModel.findOneAndUpdate(
            { project_name: taskDetails.project_name },
            { $pull: { tasks: taskDetails._id }}
        );
        const deletetask=await taskDetails.deleteOne();
        if(deletetask.deletedCount>0){
            return {
                Status: true
            }    
        }    
        return {
            Status: false
        }
    }

    async searchTask(userID: string, searchParam:string){
        return this.taskDetailsModel.find({
            user_id:userID,
            title:  { $regex: searchParam, $options: 'i' },  
        })
    }
}
