import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose'

@Schema()
export class UserDetails{
    @Prop({required: true})
    name: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required:true, unique: true})
    userID: string;

    @Prop({required:true})
    password: string;    

    @Prop({required: true})
    mpin: string
    
    // @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Task' }], required: false })
    // todos_tasks: Task[]; 
    
    // @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Task' }], required: false })
    // task_i_assigned: Task[]; 
}

export const userDetailsSchema = SchemaFactory.createForClass(UserDetails)