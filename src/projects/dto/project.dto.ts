import { IsNotEmpty, IsString } from "class-validator";

export class ProjectDto{
    @IsString()
    @IsNotEmpty()
    project_name: string;

    @IsString()
    description: string;

    @IsString()
    @IsNotEmpty()
    created_by: string;
}