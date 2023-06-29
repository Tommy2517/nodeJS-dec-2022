import { model, Schema, Types } from "mongoose";

import { EActionTokenTypes } from "../enums/action-toke-type.enum";
import { User } from "./User.mode";

const actionSchema = new Schema({
  actionToken: {
    type: String,
    required: true,
  },
  tokenType: {
    type: String,
    required: true,
    enum: EActionTokenTypes,
  },
  //id юзера который создал эту пару токенов
  _userId: {
    // all things which is link from 1 table on 2 table, they names starts with '_'
    type: Types.ObjectId,
    required: true,
    ref: User,
  },
});

export const Action = model("action", actionSchema);
