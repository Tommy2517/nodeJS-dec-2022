import { User } from "../models/User.mode";
import { userRepository } from "../repositoryes/user.repository";
import { IUser } from "../types/user.type";

class UserService {
  public async findAll(): Promise<IUser[]> {
    return User.find().select("-password");
  }
  public async create(data: IUser): Promise<IUser> {
    return userRepository.create(data);
  }

  public async findById(id: string): Promise<IUser> {
    return User.findById(id);
  }
}
export const userService = new UserService();
