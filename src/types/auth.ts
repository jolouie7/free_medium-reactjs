// define auth obj types
export interface IUser {
  name: string,
  email: string,
  username: string,
  password: string,
  bio: string,
  image: string,
  likes: string[],
  following: string[]
}

// define redux auth obj types
export interface IReduxAuthState {
  token?: string,
  isAuthenticated: boolean,
  isLoading: boolean,
  user: IUser
}

// define auth action obj types
export type AuthAction = {
  type: string,
  payload: IUser
}