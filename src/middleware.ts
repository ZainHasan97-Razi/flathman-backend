/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import jwt = require('jsonwebtoken');
import { RequestUserType } from './common/common.types';
import mongoose from 'mongoose';

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
        req["user"] = decode;
        req["user"]._id = new mongoose.Types.ObjectId(req["user"]._id);
        // console.log("user info:::: ", (req as Request&{user: RequestUserType}).user);
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
