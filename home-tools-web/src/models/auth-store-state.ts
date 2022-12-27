import { User } from "@/models/user";

export interface AuthStoreState {
  isAuthenticated: boolean;
  error: string | null;
  user: User | null;
  loading: boolean;
}
