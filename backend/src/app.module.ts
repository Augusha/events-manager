import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import database from './config/database';
import app from './config/app';
import jwt from './config/jwt';
import { AuthGuard } from './auth/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TotalCardsModule } from './dashboard/total-cards/total-cards.module';
import { ActiveEventsModule } from './dashboard/active-events/active-events.module';
import entities from './config';
import { EventsModule } from './events/events.module';
import { ImagesModule } from './images/images.module';
import {MessengerModule} from "./messenger/messenger.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database, app, jwt],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.events.host'),
        port: configService.get('database.events.port'),
        username: configService.get('database.events.username'),
        password: configService.get('database.events.password'),
        database: configService.get('database.events.database'),
        entities: entities,
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    EventsModule,
    TotalCardsModule,
    ActiveEventsModule,
    ImagesModule,
    MessengerModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard],
})
export class AppModule {}
