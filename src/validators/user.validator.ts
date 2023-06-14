import Joi from "joi";

import { regexConstants } from "../constants";
import { EGenders } from "../enums/user.enum";

export class UserValidator {
  static firstname = Joi.string().min(3).max(30).trim();
  static age = Joi.number().min(18).max(150);
  static gender = Joi.valid(...Object.values(EGenders));
  static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim()
    .required();
  static password = Joi.string()
    .regex(regexConstants.PASSWORD)
    .trim()
    .required();

  static create = Joi.object({
    name: this.firstname.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    email: this.email.required(),
    password: this.password,
  });
  //статический метод для того что бы не создавать экземпляр класса, а напрямую обращаться к методам
  static update = Joi.object({
    name: this.firstname,
    age: this.age,
    gender: this.gender,
    email: this.email,
    password: this.password,
  });
  static login = Joi.object({
    password: this.password,
    email: this.email,
    //TODO = delete or upgrade;
  });
}
