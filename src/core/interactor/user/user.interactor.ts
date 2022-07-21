import { User } from '../../entities/user';
import { UserRepository } from '../../repository/user.repository';

export const createUser = (userRepository: UserRepository) => async (
  user: User
) => userRepository.createUser(user);


export const updateUser = (userRepository: UserRepository) => async (
  user: User
) => userRepository.updateUser(user);

export const deleteUser = (userRepository: UserRepository) => async (
  user: User
) => userRepository.deleteUser(user);
