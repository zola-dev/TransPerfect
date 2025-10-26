import { DetailedUser, FilterOptions, User, ApiError } from ".";
export interface UserFormProps {
  user: DetailedUser | null;
  onSave: (userData: DetailedUser) => void;
  onCancel: () => void;
  readOnly: boolean;
}
export interface UserFormModalProps {
  toggle: () => void;
  user: DetailedUser | null;
  mode: "view" | "edit" | "add";
  onSave: (userData: DetailedUser) => void;
}
export interface AddUserProps {
  onAdd: () => void;
  size?: string;
  className?: string;
}
export interface DataTableProps {
  users: DetailedUser[];
  onEdit: (user: DetailedUser) => void;
  onDelete: (id: number) => void;
  onViewDetails: (user: DetailedUser) => void;
}
export interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  totalCount: number;
  filteredCount: number;
  onAddUser: () => void;
}
export interface TableRowProps {
  user: DetailedUser;
  onEdit: (user: DetailedUser) => void;
  onDelete: (id: number) => void;
  onViewDetails: (user: DetailedUser) => void;
}
// In a types file
/**
 * Filtered and Sorted array of users based on provided filter options.
 * 
 * Filtering:
 * - Searches across name, email, and city fields
 * - Supports case-sensitive and case-insensitive matching
 * - Supports wildcard (contains) or exact prefix matching
 * 
 * Sorting:
 * - Sorts alphabetically by name, email, or company name
 * 
 */
export type FilteredUsers = User[];
export type UserMode = "view" | "edit" | "add";
export interface UseUsersResult {
  users: User[];
  loading: boolean;
  error: ApiError | null;
  refetch: () => void;
  useMockData: boolean;
  setUseMockData: (value: boolean) => void;
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
  filteredUsers: FilteredUsers;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  UserFormModal: React.LazyExoticComponent<React.FC<any>>;
}
