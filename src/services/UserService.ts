import { AppDataSource } from '../data-source';
import { User } from '../models/User';
import { CreateUserDTO } from '../dto/CreateUserDTO';

export class UserService {
  async getAllUsers(): Promise<User[]> {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.find();
  }

  async createUser(userData: CreateUserDTO): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create(userData);
    return await userRepository.save(user);
  }
}
