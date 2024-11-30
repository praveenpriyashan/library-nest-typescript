import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../enums/role.enum';

@Schema({
  timestamps: true,
})

export class User extends Document {               //document eken extend krnne book ekk create krnkota userId ekt ekata set
  @Prop()                                         //krnna one hinda.userId ekk meke neti hinda (userge) mongoosegen ngannva.
  name: string;

  @Prop({ unique: [true, 'duplicate email'] })
  email: string;

  @Prop()
  password: string;

  @Prop({
    type: [{ type: String, enum: Role }],
    default: [Role.User],
  })
  role: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);