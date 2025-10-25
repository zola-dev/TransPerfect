import React from "react";
import { DataTableProps, TableRow, tableHeaderCell } from "../../index";
export const DataTable: React.FC<DataTableProps> = ({
  users,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  if (users.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">No users found matching your criteria.</p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className={tableHeaderCell}>ID</th>
              <th className={tableHeaderCell}>Name</th>
              <th className={tableHeaderCell}>Email</th>
              <th className={tableHeaderCell}>Phone</th>
              <th className={tableHeaderCell}>Company</th>
              <th className={tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <TableRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
                onViewDetails={onViewDetails}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
