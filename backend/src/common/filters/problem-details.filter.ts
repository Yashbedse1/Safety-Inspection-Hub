import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ProblemDetailsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ProblemDetailsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let problemDetails: any = {
      type: 'about:blank',
      title: 'Internal Server Error',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      detail: 'An unexpected error occurred',
      instance: request.url,
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;

      // If the exception already has problem details format, use it
      if (exceptionResponse && typeof exceptionResponse === 'object') {
        problemDetails = {
          type: exceptionResponse.type || 'about:blank',
          title: exceptionResponse.title || exceptionResponse.message || 'HTTP Exception',
          status: exceptionResponse.status || status,
          detail: exceptionResponse.detail || exceptionResponse.message,
          instance: request.url,
          code: exceptionResponse.code,
        };
      } else {
        // Convert to problem details format
        problemDetails = {
          type: 'about:blank',
          title: exceptionResponse.message || 'HTTP Exception',
          status: status,
          detail: exceptionResponse.message || 'An error occurred',
          instance: request.url,
        };
      }
    } else {
      // Log unexpected errors for debugging
      this.logger.error('Unexpected error:', exception);
    }

    // Set content type to application/problem+json
    response
      .status(status)
      .header('Content-Type', 'application/problem+json')
      .json(problemDetails);
  }
}
