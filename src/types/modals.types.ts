import { DetailedUser, FilterOptions } from ".";
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
