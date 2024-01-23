export interface IUser {
  id: number;
  name: string;
  username: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResponse {
  message: string;
  token: string;
  user: IUser;
}
