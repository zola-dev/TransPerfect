import { BehaviorSubject, timer, from, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { userService, User, ApiError, MOCK_USERS, UseUsersState } from "../index";
const initialState: UseUsersState = {
  users: [],
  loading: false,
  error: null,
  useMockData: false,
};

class UseUsersService {
  // private state$ = new BehaviorSubject<UseUsersState>(initialState);
  // public readonly stateObservable: Observable<UseUsersState> =
  //   this.state$.asObservable();

  // private setState(partial: Partial<UseUsersState>) {
  //   this.state$.next({ ...this.state$.getValue(), ...partial });
  // }

  fetchUsers(useMockData: boolean) {
    //this.setState({ loading: true, error: null });
    //if (this.state$.getValue().useMockData) {
      if (useMockData) {
      // timer(500).subscribe(() => {
      //   this.setState({ users: MOCK_USERS, loading: false });
      // });
      console.log("useMockData should be true... ", useMockData)
      return timer(500).pipe(
        map(() => ({
          users: MOCK_USERS,
          loading: false,
          error: null,
          useMockData: true,
        })))
    }
    console.log("useMockData should be false... ", useMockData)
    return from(userService.getUsers())
      .pipe(
        map((users: User[]) => ({
          users,
          loading: false,
          error: null,
          useMockData: false,
        })),
        catchError((err) => {
          // this.setState({
          //   users: MOCK_USERS,
          //   error: err as ApiError,
          //   useMockData: true,
          // });
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
  // setUseMockData(value: boolean) {
  //   this.setState({ useMockData: value });
  //   this.fetchUsers();
  // }
}

export const useUsersService = new UseUsersService();
