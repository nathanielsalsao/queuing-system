import mongoose, { Schema, Document } from 'mongoose';


export interface IQueue extends Document {
  customerName: string;
  serviceType: string;
  status: 'waiting' | 'called' | 'completed';
  ticketNumber: number;
  createdAt: Date;
}

const QueueSchema: Schema = new Schema({
  customerName: { type: String, required: true },
  serviceType: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['waiting', 'called', 'completed'], 
    default: 'waiting' 
  },
  ticketNumber: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IQueue>('Queue', QueueSchema);