export type AuthUser = string;

export interface AuthGateway {
  authenticate(): Promise<AuthUser>;
  onAuthStateChanged(listener: (user: AuthUser) => void): void;
}
