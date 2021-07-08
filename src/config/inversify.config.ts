import { Container } from 'inversify';
import TYPES from './types.inversify';
import { UserRepository } from '../respositories/User.repository';
import { UserService } from '../services/User.service';
import '../controllers/User.controller';

const container = new Container();

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
container.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();

export default container;
