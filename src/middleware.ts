/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import jwt = require('jsonwebtoken');

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: any) {
    try {
      const header = req.headers.authorization;
      if (header == undefined) throw 'forbidden';
      if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        const decode = jwt.verify(token, process.env.SECRET_KEY);
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
