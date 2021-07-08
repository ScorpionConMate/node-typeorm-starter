import { EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { User } from '../entities/User.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {}
