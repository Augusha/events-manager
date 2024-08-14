import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    events: {
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      port: +process.env.TYPEORM_PORT,
      charset: 'utf8mb4_unicode_ci',
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      logging: (process.env.TYPEORM_LOGGING || '').split(',') || false,
      logger: process.env.TYPEORM_LOGGER,
      entities: ['**/*.entity{.ts,.js}'],
      migrations: ['libs/**/migrations/**/*.js'],
      autoLoadEntities: true,
      keepConnectionAlive: true,
    },
  };
});
