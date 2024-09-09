import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(res: Response): Promise<Response> {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(201).json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar usuários!', error });
    }
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email } = req.body;
      const user = await this.userService.createUser({ name, email });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar usuário!', error });
    }
  }
}
