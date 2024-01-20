export interface AuthenticationResponse {
  access_token: string;
  refresh_token: string;
}

export enum SignoutReason {
  NoReason = 0,
  Timeout = 1,
  Signout = 2,
}
