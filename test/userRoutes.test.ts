import request from 'supertest';
import { app } from './serverTest';

describe('Testes para endpoints de usuários', () => {
  it('Teste para verificar se a resposta contém uma lista de usuários', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);

    response.body.forEach((user: any) => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
    });
  });

  it('Teste para verificar se a resposta retorna o usuário pelo ID', async () => {
    const userId = 1;
    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', userId);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
  });

  it('Teste para verificar se um novo usuário é criado', async () => {
    const newUser = {
      name: 'Anderson Santos',
      email: 'anderson@example.com',
    };

    const response = await request(app).post('/api/users').send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', newUser.name);
    expect(response.body).toHaveProperty('email', newUser.email);
  });

  it('Teste para verificar se os dados de um usuário são atualizados corretamente', async () => {
    const userId = 1;
    const updatedUserData = {
      name: 'Ademir Silva',
      email: 'ademir@example.com',
    };

    const response = await request(app).put(`/api/users/${userId}`).send(updatedUserData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', userId);
    expect(response.body).toHaveProperty('name', updatedUserData.name);
    expect(response.body).toHaveProperty('email', updatedUserData.email);

    // Verificar se os dados foram realmente atualizados
    const getUserResponse = await request(app).get(`/api/users/${userId}`);
    expect(getUserResponse.status).toBe(200);
    expect(getUserResponse.body).toHaveProperty('id', userId);
    expect(getUserResponse.body).toHaveProperty('name', updatedUserData.name);
    expect(getUserResponse.body).toHaveProperty('email', updatedUserData.email);
  });

  it('Teste para verificar se um usuário é deletado corretamente', async () => {
    const userToDelete = {
      name: 'Usuário Para Deletar',
      email: 'deletar@example.com',
    };

    const createUserResponse = await request(app).post('/api/users').send(userToDelete);

    const createdUserId = createUserResponse.body.id;

    const deleteResponse = await request(app).delete(`/api/users/${createdUserId}`);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty('message', 'Usuário deletado com sucesso!');

    // Verificar se o usuário foi realmente deletado
    const getUserResponse = await request(app).get(`/api/users/${createdUserId}`);
    expect(getUserResponse.status).toBe(404);
    expect(getUserResponse.body).toHaveProperty('message', 'Usuário não existe!');
  });
});
