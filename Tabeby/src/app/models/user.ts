export interface User {
  id?: number;
  email?: string;
  name?: string;
  role?: string;
    // 👇 دي جديدة
  google?: {
    accessToken?: string;
    refreshToken?: string;
  };
}
