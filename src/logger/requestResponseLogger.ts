import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new LoggerService('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { originalUrl, body, query } = request;

    const send = response.send;
    response.send = (resBody) => {
      const { statusCode } = response;
      const message = `
      Url: ${originalUrl}
      QueryParams: ${JSON.stringify(query)}
      ReqBody: ${JSON.stringify(body)}
      ResBody: ${resBody}
      StatusCode: ${statusCode}
      `;
      this.logger.customHTTPLog(message);
      response.send = send;
      return response.send(resBody);
    };

    next();
  }
}
