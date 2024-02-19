"use strict";
import {Schema,model, Date} from 'mongoose'


const MessageSchema = new Schema({
    user: String,
    text: String,
    timestamp: {type: Date, default: Date.now}
})

const MessageModel = model('Message', MessageSchema);
export const Message = MessageModel;