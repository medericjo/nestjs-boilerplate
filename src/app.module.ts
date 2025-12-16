import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './lib/auth';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, AuthModule.forRoot({ auth }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
