export type AuthUser = string;

export interface AuthGateway {
  authenticate(): Promise<AuthUser>;
}
