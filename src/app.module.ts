import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './infrastructure/auth/auth.module';
import {RestModule} from "./presentation/rest.module";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: true,
            logging: true
        }),
        AuthModule,
        RestModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
