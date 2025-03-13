import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SuccessResponseInterceptor } from '@common/interceptors/success-response.interceptor';
import { HttpExceptionFilter } from '@common/exceptions/http-exception.filter';
import { seedDefaultUser } from '@database/seeds/seed-default-user';
import { AppDataSource } from '@database/data-source';

async function bootstrap() {
  await AppDataSource.initialize(); // Inicializa o DataSource para carregar os metadados

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Aplicar Interceptor para respostas de sucesso
  app.useGlobalInterceptors(
    new SuccessResponseInterceptor(), 
    new ClassSerializerInterceptor(app.get(Reflector))
  );

  // Aplicar Filtro de Exceções para erros
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,   // Remove propriedades não declaradas nos DTOs
      forbidNonWhitelisted: true, // Rejeita requisições com propriedades não declaradas
      transform: true,    // Transforma o payload para os tipos esperados nos DTOs
    }),
  );
  
  await app.listen(process.env.PORT, '0.0.0.0');
  // Executa a seed após o app iniciar
  await seedDefaultUser();
}
bootstrap();
