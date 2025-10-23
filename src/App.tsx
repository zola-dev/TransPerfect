import React, { useState, useMemo, useEffect, Suspense, lazy } from "react";
import { FilterOptions, DetailedUser } from "./types";
import { useUsers } from "./hooks";
import { filterAndSortUsers } from "./utils";
import { LoadingSpinner, FilterBar, DataTable } from "./components";
import "./App.css";

const App: React.FC = () => {
  const {
    users: fetchedUsers,
    loading,
    error,
    useMockData,
    setUseMockData,
  } = useUsers();
  const [users, setUsers] = useState<DetailedUser[]>([]);
  useEffect(() => {
    setUsers(fetchedUsers as DetailedUser[]);
  }, [fetchedUsers]);
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: "",
    sortBy: "name",
    caseSensitive: false,
    wildcard: false,
  });
  const [selectedUser, setSelectedUser] = useState<DetailedUser | null>(null);
  const UserFormModal = lazy(() => import("./components/modals/UserFormModal"));
  const filteredUsers = useMemo(
    () => filterAndSortUsers(users, filters),
    [users, filters]
  );
  const [mode, setMode] = useState<"view" | "edit" | "add">("view");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      //this.setState(prevState => ({ users: prevState.users.filter(u => u.id !== id) }));//
      //await userService.deleteUser(id);//for real API
      alert("User deleted successfully!");
    } catch (error) {
      alert("Failed to delete user. Please try again.");
      console.error("Delete error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            User Management System
          </h1>
          <p className="text-gray-600">
            Manage and view user information with advanced filtering
          </p>
        </header>

        {/* Data Source Toggle */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-blue-900">
                Data Source: {useMockData ? "Mock Data" : "Live API"}
              </span>
              {error && !useMockData && (
                <span className="text-xs text-red-600">
                  (API failed, using mock data)
                </span>
              )}
            </div>
            <button
              onClick={() => setUseMockData(!useMockData)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Switch to {useMockData ? "Live API" : "Mock Data"}
            </button>
          </div>
        </div>

        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          totalCount={users.length}
          filteredCount={filteredUsers.length}
          onAddUser={handleAddUser}
        />
        <DataTable
          users={filteredUsers}
          onEdit={handleEditUser}
          onDelete={handleDelete}
          onViewDetails={(user) => handleViewUser(user)}
        />

        {isModalOpen && (
          <Suspense
            fallback={<div className="text-center p-6">Loading...</div>}
          >
            <UserFormModal
              toggle={() => setIsModalOpen(false)}
              user={selectedUser}
              mode={mode}
              onSave={handleSave}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default App;
