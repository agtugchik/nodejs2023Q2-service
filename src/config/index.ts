export default () => ({
  CRYPT_SALT: process.env.CRYPT_SALT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  TOKEN_EXPIRE_TIME: process.env.TOKEN_EXPIRE_TIME,
});
