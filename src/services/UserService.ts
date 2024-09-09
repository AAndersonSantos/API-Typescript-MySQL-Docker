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

  async getUserById(id: number): Promise<User | null> {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.findOneBy({ id });
  }

  async updateUser(id: number, userData: CreateUserDTO): Promise<User | null> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      return null;
    }

    userRepository.merge(user, userData);
    const updatedUser = await userRepository.save(user);

    return updatedUser;
  }

  async deleteUserById(id: number): Promise<boolean> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id });
    if (!user) {
      return false;
    }

    await userRepository.remove(user);
    return true;
  }
}
