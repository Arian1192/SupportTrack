import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TicketDocument = HydratedDocument<Ticket>;

enum STATUS {
  OPEN = 'open',
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}

enum PRIORITY {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Schema()
export class Ticket {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true, maxlength: 250 })
  description: string;
  @Prop({ type: String, enum: STATUS, default: STATUS.OPEN })
  status: STATUS;
  @Prop({ type: String, enum: PRIORITY, default: PRIORITY.LOW })
  priority: PRIORITY;
  @Prop({ default: Date.now() })
  createdAt: Date;
  @Prop({ default: Date.now() })
  updatedAt: Date;
  @Prop()
  closedAt: Date;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  creatorId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User' })
  agentId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Category' })
  categoryId: Types.ObjectId;
  @Prop([{ type: Types.ObjectId, ref: 'Comment' }])
  comments: Types.ObjectId[];
}
export const TicketSchema = SchemaFactory.createForClass(Ticket);
