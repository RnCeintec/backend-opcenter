import bcrypt from 'bcrypt';
import { SALT } from '../config';

export const encrypt = async (password: string) =>
  await bcrypt.hash(password, SALT);

export const checkPassword = async (password: string, encrypted: string) =>
  await bcrypt.compare(password, encrypted);

export const encryptSync = (password: string) =>
  bcrypt.hashSync(password, SALT);

export const checkPasswordSync = (password: string, encrypted: string) =>
  bcrypt.compareSync(password, encrypted);
