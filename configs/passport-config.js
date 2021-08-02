const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const { User: service } = require('../services');

const { SECRET_KEY } = process.env;

const settings = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY,
}

passport.use("jwt",
    new Strategy(settings, async (payload, done) => {
        try {
            const user = await service.getById(payload.id);
            if (!user) {
                throw new Error('User not found');
            }
            done(null, user);
        }
        catch (error) {
            done(error)
        }
    })
)