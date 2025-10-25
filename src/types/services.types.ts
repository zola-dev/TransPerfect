import { User, ApiError } from "./index";
//UseUsersService
export interface UseUsersState {
  users: User[];
  loading: boolean;
  error: ApiError | null;
  useMockData: boolean;
}
