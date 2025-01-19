import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Replace with a secure key
      passReqToCallback: true, // Set to true to access the request
    });
  }

  async validate(req: Request, payload: any) {
    // Access the request object if needed
    return { userId: payload.sub, username: payload.username };
  }
}
