import { timer, from } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { userService, User, ApiError, MOCK_USERS } from "../index";
class UseUsersService {
  fetchUsers(useMockData: boolean) {
      if (useMockData) {
      return timer(500).pipe(//fake deley to showcase loader
        map(() => ({
          users: MOCK_USERS,
          loading: false,
          error: null,
          useMockData: true,
        })))
    }
    return from(userService.getUsers())
      .pipe(
        map((users: User[]) => ({
          users,
          loading: false,
          error: null,
          useMockData: false,
        })),
        catchError((err) => {
          return from([
            {
              users: MOCK_USERS,
              loading: false,
              error: err as ApiError,
              useMockData: true,
            },
          ]);
        })
      )
  }
}
export const useUsersService = new UseUsersService();
