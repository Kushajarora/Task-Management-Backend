import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskStatus } from 'src/common/enums/enum';
import { v4 as uuidv4 } from 'uuid';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Task extends Document {
  @Prop({ required: true, maxlength: 100, unique:true })
  title: string;

  @Prop()
  description: string;

  @Prop({ maxlength: 20 })
  priority: string;

  @Prop({ default: TaskStatus.PENDING,enum:TaskStatus})
  status: TaskStatus;

  @Prop()
  deadline: Date;

  @Prop()
  reminder: Date;

  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  assigned_person_id: string;

  @Prop({ required: true })
  project_name: string;

  @Prop({ default: () => uuidv4(), unique: true }) // Generate UUID automatically
  task_id: string; // Define a field for task ID
}

const TaskSchema = SchemaFactory.createForClass(Task);
// Create a compound index to simulate a composite key
TaskSchema.index({ title: 1, project_name: 1 }, { unique: true });

export { TaskSchema };