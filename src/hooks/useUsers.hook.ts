import { useState, useEffect } from "react";
import { User, ApiError } from "../types";
import { useUsersService, UseUsersState } from "../services";
import { filter, take } from "rxjs/operators";
interface UseUsersResult {
  users: User[];
  loading: boolean;
  error: ApiError | null;
  refetch: () => void;
  useMockData: boolean;
  setUseMockData: (value: boolean) => void;
}
export const useUsers = (): UseUsersResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [useMockData, setUseMockData] = useState<boolean>(false);
  useEffect(() => {
    useUsersService.stateObservable
    .pipe(
      filter(state => !state.loading), 
      take(1)
    )
    .subscribe((state: UseUsersState) => {
      setUsers(state.users);
      setLoading(state.loading);
      setError(state.error);
      setUseMockData(state.useMockData);
    });
    useUsersService.fetchUsers();
  }, []);
  return {
    users,
    loading,
    error,
    refetch: () => useUsersService.fetchUsers(),
    useMockData,
    setUseMockData:  (value: boolean) => useUsersService.setUseMockData(value),
  };
};
