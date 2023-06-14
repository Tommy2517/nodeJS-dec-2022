import { model, Schema, Types } from "mongoose";

import { User } from "./User.mode";

const tokensSchema = new Schema({
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  //id юзера который создал эту пару токенов
  _userId: {
    // all things which is link from 1 table on 2 table, they names starts with '_'
    type: Types.ObjectId,
    required: true,
    ref: User,
  },
});

export const Token = model("token", tokensSchema);
