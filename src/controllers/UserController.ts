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
      return res.status(200).json(users);
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

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await this.userService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não existe!' });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar usuários!', error });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.id, 10);
      const updatedUser = await this.userService.updateUser(userId, req.body);

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating user', error });
    }
  }

  async deleteUserById(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.id, 10);

      const result = await this.userService.deleteUserById(userId);

      if (!result) {
        return res.status(404).json({ message: 'Usuário não existe!' });
      }

      return res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar usuário!', error });
    }
  }
}
