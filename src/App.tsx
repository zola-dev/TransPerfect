import React, { useState, useMemo, useEffect, Suspense, lazy } from "react";
import { FilterOptions, DetailedUser } from "./types";
import { useUsers } from "./hooks";
import { filterAndSortUsers } from "./utils";
import { LoadingSpinner, FilterBar, DataTable } from "./components";
import "./App.css";

const App: React.FC = () => {
  const {
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
  } = useUsers();
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: "",
    sortBy: "name",
    caseSensitive: false,
    wildcard: false,
  });
  const UserFormModal = lazy(() => import("./components/modals/UserFormModal"));
  const filteredUsers = useMemo(
    () => filterAndSortUsers(users as DetailedUser[], filters),
    [users, filters]
  );
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
              toggle={() => closeModal()}
              user={selectedUser as DetailedUser}
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
