export type User = {
  username: string;
  email: string;
};

export type LoggedUser = {
  user: User;
  token: string;
};
