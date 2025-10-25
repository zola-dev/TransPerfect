import { BehaviorSubject, timer, from, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { userService, User, ApiError, MOCK_USERS, UseUsersState } from "../index";
const initialState: UseUsersState = {
  users: [],
  loading: false,
  error: null,
  useMockData: false,
};

class UseUsersService {
  private state$ = new BehaviorSubject<UseUsersState>(initialState);
  public readonly stateObservable: Observable<UseUsersState> =
    this.state$.asObservable();

  private setState(partial: Partial<UseUsersState>) {
    this.state$.next({ ...this.state$.getValue(), ...partial });
  }

  fetchUsers() {
    this.setState({ loading: true, error: null });

    if (this.state$.getValue().useMockData) {
      timer(500).subscribe(() => {
        this.setState({ users: MOCK_USERS, loading: false });
      });
      return;
    }
    from(userService.getUsers())
      .pipe(
        catchError((err) => {
          this.setState({
            users: MOCK_USERS,
            error: err as ApiError,
            useMockData: true,
          });
          return [];
        })
      )
      .subscribe((users: User[] | []) => {
        if (users.length) this.setState({ users, error: null });
        this.setState({ loading: false });
      });
  }

  setUseMockData(value: boolean) {
    this.setState({ useMockData: value });
    this.fetchUsers();
  }
}

export const useUsersService = new UseUsersService();
