import { useState, useEffect, useMemo, lazy } from "react";
import {
  User,
  DetailedUser,
  ApiError,
  FilterOptions,
  filterAndSortUsers,
  useUsersService,
  UseUsersState,
  UserMode,
  UseUsersResult,
  SweetalertService
} from "../index";
import { filter, take } from "rxjs/operators";
/**
 * Custom hook for managing users with CRUD operations, filtering, and modal state.
 * 
 * Provides a complete user management interface including:
 * - Fetching users (with mock/API mode toggle)
 * - Adding, editing, viewing, and deleting users
 * - Client-side filtering and sorting
 * - Modal state management
 * 
 * @returns Object containing user state, handlers, and UI components
 * 
 * @example
 * const {
    users,
    loading,
    error,
    useMockData,
    setUseMockData,
    isModalOpen,
    mode,
    handleAddUser,
    selectedUser,
    handleEditUser,
    handleViewUser,
    handleDelete,
    handleSave,
    closeModal,
    filters,
    setFilters,
    filteredUsers,
    UserFormModal
 * } = useUsers();
 *
 * @description 
 * - useUsers uses stateless UseUsersService to handle API/mock data fetching logic via RxJS observables.
 * - The hook maintains all UI state and subscribes to service observables to update user data.
 */
export const useUsers = (): UseUsersResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [useMockData, setUseMockData] = useState<boolean>(false);
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
    setLoading(true);
    useUsersService
      .fetchUsers(useMockData)
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
    useUsersService.fetchUsers(useMockData);
  }, [useMockData]);
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
      SweetalertService.success("User updated successfully!");
    } else {
      const id = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      setUsers((prev) => [...prev, { ...userData, id: id }]);
      SweetalertService.success("User stored successfully!");
    }
    setIsModalOpen(false);
  };
  const handleDelete = async (id: number) => {
    // if (!window.confirm("Are you sure you want to delete this user?")) return;
    const confirmed = await SweetalertService.confirm("Do you want to delete this user?");
    if (!confirmed) return;
    try {
      setUsers((prev) => prev.filter((user) => user.id !== id));
      //alert("User deleted successfully!");
      SweetalertService.success("User deleted successfully!");
    } catch (error) {
      //alert("Failed to delete user. Please try again.");
      SweetalertService.error("Failed to delete user. Please try again.!");
      console.error("Delete error:", error);
    }
  };
  /**
   * Users array after applying filters and sorting.
   *
   * Filtering:
   * - Searches across name, email, and city
   * - Supports case-sensitive and case-insensitive matching
   * - Supports wildcard (contains) or exact prefix matching
   * 
   * Sorting:
   * - Sorts alphabetically by name, email, or company name
   * 
   * @hover filterAndSortUsers from "\src\utils\data.utils.ts" for params and example
   */
  const filteredUsers = useMemo(
    () => filterAndSortUsers(users as DetailedUser[], filters),
    [users, filters]
  );
  const closeModal = () => setIsModalOpen(false);
  const UserFormModal = lazy(
    () => import("../components/modals/UserFormModal")
  );
  return {
    users,
    loading,
    error,
    refetch: () => useUsersService.fetchUsers(useMockData),
    useMockData,
    setUseMockData: (value: boolean) => setUseMockData(value),
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
    UserFormModal,
  };
};
