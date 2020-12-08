const passport = require('passport');
const { Strategy: GithubStrategy } = require('passport-github');

const GITHUB_STRATEGY_OPTIONS = {
    clientID: 'd124b3139da398676a9d',
    clientSecret: 'd2125ad191da338e9c0178205e03c5fcf85a7562',
    callbackURL: 'http://localhost:9000/api/login/github/callback',
};

const githubStrategy = new GithubStrategy(
    GITHUB_STRATEGY_OPTIONS,
    (accessToken, refreshToken, profile, done) => {
        /**
         * 根据 profile 查找或新建 user 信息
         */
        const user = {};
        done(null, user);
    }
);

passport.use(githubStrategy);

passport.serializeUser((user, done) => {
    /**
     * 根据 user 信息获取 userId
     */
    const userId = '46e5';
    done(null, userId);
});

passport.deserializeUser((userId, done) => {
    /**
     * 根据 userId 获取 user 信息
     */
    const user = {};
    done(null, user);
});

module.exports = function authMiddleware() {
    return [passport.initialize(), passport.session()];
};

Object.assign(module.exports, { passport });
