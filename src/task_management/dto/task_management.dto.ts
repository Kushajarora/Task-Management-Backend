import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { TaskStatus } from 'src/common/enums/enum';

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  priority?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  deadline?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  reminder?: Date;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  assigned_person_id:string;
 
  @IsNotEmpty()
  @IsString()
  project_name?: string;

}

export class UpdateTaskStatusDTO {
    @IsString()
    @IsNotEmpty()
    task_id: string;

    @IsEnum(TaskStatus)
    @IsNotEmpty()
    status: TaskStatus;

    @IsNotEmpty()
    @IsString()
    user_id: string;
}

