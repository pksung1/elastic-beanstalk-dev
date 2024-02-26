declare namespace Auth {
  interface JwtPayload {
    username: string;
    sub: string;
    roles: User.Role[];
  }

  interface JwtPayloadParse {
    userId: string;
    username: string;
    roles: User.Role[];
  }
}
