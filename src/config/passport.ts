import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptionsWithRequest,
  VerifiedCallback,
} from "passport-jwt";
import { Student } from "../models/Student";
import dotenv from "dotenv";
dotenv.config();

import { PassportStatic } from "passport";

interface JwtPayload {
  sub: string;
  iat?: number;
  exp?: number;
}

const options: StrategyOptionsWithRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY!,
  passReqToCallback: true,
};

export const configurePassport = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(
      options,
      async (req, payload: JwtPayload, done: VerifiedCallback) => {
        try {
          const student = await Student.findByPk(payload.sub);
          if (student) {
            return done(null, student);
          } else {
            return done(null, false);
          }
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};
3;
