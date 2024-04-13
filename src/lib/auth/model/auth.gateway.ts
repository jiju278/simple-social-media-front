export type AuthUser = string;

export interface AuthGateway {
  getAuthUser(): string;
  authenticate(): Promise<AuthUser>;
}
