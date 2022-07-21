import { getRepository, Raw } from 'typeorm';

import { User } from '../entities/user';
import { UserRepository } from '../repository/user.repository';

export class UserTypeORM implements UserRepository {
  async findUserByUuid(username: string): Promise<User | undefined> {
    try {
      return await getRepository(User).findOne({
        where: { username }
      });
    } catch (error:any) {
      throw new Error(error);
    }
    
  }

  async createUser(user: User): Promise<User> {
    try {
      if (await this.findUserByUuid(user.username)) throw 'Usuario ya registrado';
      return await getRepository(User).save(user);
    } catch (error:any) {
      throw new Error(error);
    }
  }
  async findUser(id: number): Promise<User | undefined> {
    try {
      return await getRepository(User).findOne({
        where: { id: true },
      });
    } catch (error:any) {
      throw new Error(error);
    }
  }
  
  async updateUser(user: User): Promise<User> {
    try {
      const findUserByUUid = await this.findUserByUuid(user.username);
      if (findUserByUUid !== undefined && user.username !== findUserByUUid.username)
        throw 'Usuario no registrado';
      return await getRepository(User).save(user);
    } catch (error:any) {
      throw new Error(error);
    }
  }
  async deleteUser(user: User): Promise<User> {
    try {
      user.isActive = false;
      return await getRepository(User).save(user);
    } catch (error:any) {
      throw new Error(error);
    }
  }
}
