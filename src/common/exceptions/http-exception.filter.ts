import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception);
    
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string|object = 'Internal server error';

    if (exception instanceof QueryFailedError) {
      const errorCode = (exception as any).code; // Código do erro do banco
      message = 'Erro ao processar a solicitação no banco de dados.';

      if (errorCode === '23505') {
        const detail = (exception as any).detail || '';
        const columnMatch = detail.match(/Key \((.*?)\)=/); // Extrai o nome da coluna única
        const column = columnMatch ? columnMatch[1] : 'valor único';

        message = `O valor fornecido para a coluna "${column}" já está em uso.`;
        status = HttpStatus.CONFLICT;
      }
    } 
    
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() as string|object;

      if (typeof message === 'object' && 'message' in message) {
        message = (message as any).message;
      }
    }

    // Resposta personalizada
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.originalUrl,
      message,
    });
  }
}
