import React from "react";
import { FilterOptions, FilterBarProps, inputClass, AddUserButton, cl } from "../../index";
import { Type, Asterisk } from "lucide-react";
export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  totalCount,
  filteredCount,
  onAddUser,
}) => {
  return (
    <div className={cl("bg-white rounded-lg shadow-md p-6 mb-6")}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Filters & Search
          </h2>
          <span className="text-sm text-gray-600">
            Showing {filteredCount} of {totalCount} users
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Users
            </label>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={filters.searchTerm}
              onChange={(e) =>
                onFilterChange({ ...filters, searchTerm: e.target.value })
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  sortBy: e.target.value as FilterOptions["sortBy"],
                })
              }
              className={inputClass}
            >
              <option value="name">Name (A-Z)</option>
              <option value="email">Email (A-Z)</option>
              <option value="company">Company (A-Z)</option>
            </select>
          </div>

          {/* Case-sensitive, Wildcard, AddUserButton*/}
          <div className="flex items-center mt-6 md:mt-8 justify-between cursor-pointer select-none  md:col-span-2">
            {/* Case-sensitive toggle */}
            <div
              className="flex items-center space-x-2"
              onClick={() =>
                onFilterChange({
                  ...filters,
                  caseSensitive: !filters.caseSensitive,
                })
              }
            >
              <Type
                size={20}
                className={
                  filters.caseSensitive ? "text-blue-600" : "text-gray-400"
                }
              />
              <span className="ml-2 text-sm text-gray-700">Case-Sensitive</span>
            </div>
            {/* Wildcard toggle */}
            <div
              className="flex items-center space-x-2 ml-8"
              onClick={() =>
                onFilterChange({ ...filters, wildcard: !filters.wildcard })
              }
            >
              <Asterisk
                size={20}
                className={filters.wildcard ? "text-blue-600" : "text-gray-400"}
              />
              <span className="ml-2 text-sm text-gray-700">
                Wildcard Search
              </span>
            </div>
            {/* Right: Add User Button */}
            <span className="ml-auto">
              <AddUserButton onAdd={onAddUser} size="lg" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
