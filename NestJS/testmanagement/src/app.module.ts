import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPE_ORM_MODULE_CONFIG } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(TYPE_ORM_MODULE_CONFIG),
        TasksModule,
        AuthModule,
    ],
})
export class AppModule {
}
