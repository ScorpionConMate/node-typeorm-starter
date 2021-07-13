/* eslint-disable consistent-return */
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { PassportStatic } from 'passport';
import cfg from '../config/main.config';
import { User } from '../entities/User.entity';

export function applyPassportStrategy(passport: PassportStatic): void {
  const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: cfg.PASSPORT.SECRET,
  };

  passport.use(
    new Strategy(options, async (payload, done): Promise<void> => {
      const { email } = payload;
      try {
        const user = await User.findOne({ where: { email } });
        return done('', user.userInfo);
      } catch (error) {
        done(error, false);
      }
    }),
  );
}
