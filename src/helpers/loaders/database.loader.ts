import { Container } from 'typeorm-typedi-extensions';
import { Connection, createConnection, useContainer as typeOrmUseContainer } from 'typeorm';
import { useContainer as rcUseContainer } from 'routing-controllers';

export default async (): Promise<Connection> => {
  rcUseContainer(Container);
  typeOrmUseContainer(Container);

  return createConnection();
};
