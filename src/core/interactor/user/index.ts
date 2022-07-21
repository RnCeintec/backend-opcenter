import {
  createUser,
  updateUser,
  deleteUser,
} from './user.interactor';

import { UserTypeORM } from '../../datasource/user.datasource';

const userRepository = new UserTypeORM();

export const createUserInteractor = createUser(userRepository);

export const updateUserInteractor = updateUser(userRepository);

export const deleteUserInteractor = deleteUser(userRepository);
