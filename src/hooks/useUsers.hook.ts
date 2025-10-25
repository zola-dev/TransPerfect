import { useState, useEffect, useMemo, lazy } from "react";
import { User, DetailedUser, ApiError, FilterOptions, filterAndSortUsers, useUsersService, UseUsersState  } from "../index";
import { filter, take } from "rxjs/operators";
export type UserMode = "view" | "edit" | "add";
interface UseUsersResult {
  users: User[];
  loading: boolean;
  error: ApiError | null;
  refetch: () => void;
  useMockData: boolean;
  setUseMockData: (value: boolean) => void;
  // Modal
  selectedUser: User | null;
  isModalOpen: boolean;
  mode: UserMode;
  handleAddUser: () => void;
  handleEditUser: (user: DetailedUser) => void;
  handleViewUser: (user: DetailedUser) => void;
  handleSave: (userData: DetailedUser) => void;
  handleDelete: (id: number) => void;
  closeModal: () => void;
  filters: FilterOptions;
  filteredUsers: User[];
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>
  UserFormModal: React.LazyExoticComponent<React.FC<any>>;
}
export const useUsers = (): UseUsersResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [useMockData, setUseMockData] = useState<boolean>(false);
  //New state for modal
  const [selectedUser, setSelectedUser] = useState<DetailedUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<UserMode>("view");
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: "",
    sortBy: "name",
    caseSensitive: false,
    wildcard: false,
  });
  useEffect(() => {
    useUsersService.stateObservable
      .pipe(
        filter((state) => !state.loading),
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
  const handleAddUser = () => {
    setSelectedUser(null);
    setMode("add");
    setIsModalOpen(true);
  };

  const handleEditUser = (user: DetailedUser) => {
    setSelectedUser(user);
    setMode("edit");
    setIsModalOpen(true);
  };
  const handleViewUser = (user: DetailedUser) => {
    setSelectedUser(user);
    setMode("view");
    setIsModalOpen(true);
  };
  const handleSave = (userData: DetailedUser) => {
    if (selectedUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userData.id ? userData : u))
      );
    } else {
      const id = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      setUsers((prev) => [...prev, { ...userData, id: id }]);
    }
    setIsModalOpen(false);
  };
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      setUsers((prev) => prev.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    } catch (error) {
      alert("Failed to delete user. Please try again.");
      console.error("Delete error:", error);
    }
  };
  const filteredUsers = useMemo(
    () => filterAndSortUsers(users as DetailedUser[], filters),
    [users, filters]
  );

  const closeModal = () => setIsModalOpen(false);
  const UserFormModal = lazy(() => import("../components/modals/UserFormModal"));
  return {
    users,
    loading,
    error,
    refetch: () => useUsersService.fetchUsers(),
    useMockData,
    setUseMockData: (value: boolean) => useUsersService.setUseMockData(value),
    //new modal logic
    selectedUser,
    isModalOpen,
    mode,
    handleAddUser,
    handleEditUser,
    handleViewUser,
    handleSave,
    handleDelete,
    closeModal,
    filteredUsers,
    setFilters,
    filters,
    UserFormModal
  };
};
