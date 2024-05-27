// project.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { UserDetails } from 'src/schemas/user.schema'; // Import the User schema
import { Task } from 'src/schemas/tasks.schema';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Project extends Document {
  @Prop({ required: true, unique:true})
  project_name: string;

  @Prop({required: false})
  description: string;

  @Prop({required: true})
  created_by: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'UserDetails' }], required: false })
  users: UserDetails[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Task' }], required: false })
  tasks: Task[]; 
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
