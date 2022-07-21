import { User } from '../entities';
export interface UserRepository {
  createUser(user: User): Promise<User>;
  findUser(username: number): Promise<User | undefined>;
  updateUser(user: User): Promise<User>;
  deleteUser(user: User): Promise<User>;
}
