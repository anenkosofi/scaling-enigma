export type User = {
  username: string;
  email: string;
};

export type Token = {
  access: string;
  refresh: string;
};

export type LoggedUser = {
  user: User;
  token: Token;
};
