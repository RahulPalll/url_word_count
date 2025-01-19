import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      console.log(
        `[${new Date().toISOString()}] ${method} ${url} ${statusCode} - ${responseTime}ms`,
      );
    });

    next(); // Pass control to the next middleware or route handler
  }
}
