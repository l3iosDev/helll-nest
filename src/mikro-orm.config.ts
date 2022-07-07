import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';

const config: MikroOrmModuleSyncOptions = {
  dbName: 'hello_nest',
  type: 'postgresql',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  entities: ['dist/**/*.entities.js'],
  entitiesTs: ['src/**/*.entities.ts'],
  debug: true,
};

export default config;
