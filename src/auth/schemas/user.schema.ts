import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema({
  timestamps:true
})

export class User extends Document{               //document eken extend krnne book ekk create krnkota userId ekt ekata set
  @Prop()                                         //krnna one hinda.userId ekk meke neti hinda (userge) mongoosegen ngannva.
  name: string;

  @Prop({unique:[true,'duplicate email']})
  email: string;

  @Prop()
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);