/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import jwt = require('jsonwebtoken');

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: any) {
    // console.log('req.headers.authorization =>>>> ', req.headers.authorization);
    let key = '12345678987654321';

    try {
      const header = req.headers.authorization;
      if (header == undefined) throw 'forbidden';
      if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        const decode = jwt.verify(token, key);
        req.body.decodeToken = decode;
        // console.log('Success D');
      }
      next();
    } catch (e) {
      res.status(403).send({
        responseCode: 403,
        responseMessage: 'Forbidden',
        result: 'Session Expired',
      });
    }
  }
}
