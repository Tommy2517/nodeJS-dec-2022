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
    // .required();
    .messages({
      "string.empty": "Це поле обов'язкове",
      "string.email": "Адрес электронной почты имеет неверный формат",
    });
  static password = Joi.string().regex(regexConstants.PASSWORD).trim();

  static create = Joi.object({
    name: this.firstname.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    email: this.email.required(),
    password: this.password.required(),
  });
  //статический метод для того что бы не создавать экземпляр класса, а напрямую обращаться к методам
  static update = Joi.object({
    name: this.firstname,
    age: this.age,
    gender: this.gender,
    // email: this.email,
    // password: this.password,
  });
  static login = Joi.object({
    password: this.password.required(),
    email: this.email.required(),
  });
  static changePassword = Joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });

  static forgotPassword = Joi.object({
    email: this.email.required(),
  });
  static setForgotPassword = Joi.object({
    password: this.password.required(),
  });
}
