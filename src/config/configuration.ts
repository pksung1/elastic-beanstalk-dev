export default () => ({
  databas: {
    url: process.env.DATABASE_URL,
  },
  auth: {
    passwordSecret: process.env.AUTH_PASSWORD_SECRET,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  },
});
