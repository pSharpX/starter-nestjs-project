import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
        const allowedOrigins = ['http://localhost:3000'];
        if (allowedOrigins.indexOf(req.header('Origin')) > -1 ) {
            res.header('Access-Control-Allow-Origin', req.header('Origin'));
            res.header('Access-Control-Allow-Headers', 'content-type');
            res.header('Access-Control-Allow-Methods', '*');
        }
        next();
    };
  }
}
