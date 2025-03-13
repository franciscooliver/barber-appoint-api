import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '@database/data-source'; // Importa as configurações do DataSource
import { ConfigModule } from '@nestjs/config';
import { BarbershopsModule } from '@modules/barbershops/barbershops.module';
import { AppointmentsModule } from '@modules/appointments/appointments.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { ServicesModule } from '@modules/services/services.module';
import { AuthMiddleware } from '@modules/auth/auth-middleware';
import { AddressesModule } from '@modules/addresses/addresses.module';
import { CollaboratorsModule } from '@modules/collaborators/collaborators.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UsersModule,
    // Ajusta o data-source usando as opções definidas em AppDataSource
    TypeOrmModule.forRoot(AppDataSource.options),
    BarbershopsModule,
    AppointmentsModule,
    ServicesModule,
    AddressesModule,
    CollaboratorsModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        'appointments', 
        'barbershops', 
        'users', 
        'collaborator'
      ); // Aplica o middleware a módulos específicos
  }
}
