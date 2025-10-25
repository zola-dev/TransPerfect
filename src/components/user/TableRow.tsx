import React from "react";
import {
  TableRowProps,
  cl,
  cellBaseClass,
  textGray900,
  textGray600,
  editButtonClass,
  deleteButtonClass,
} from "../../index";
export const TableRow: React.FC<TableRowProps> = ({
  user,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  return (
    <tr
      onClick={() => onViewDetails(user)}
      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
    >
      <td className={cl(cellBaseClass, textGray900)}>{user.id}</td>
      <td className={cl(cellBaseClass, textGray900)}>{user.name}</td>
      <td className={cl(cellBaseClass, textGray600)}>{user.email}</td>
      <td className={cl(cellBaseClass, textGray600)}>{user.phone}</td>
      <td className={cl(cellBaseClass, textGray600)}>{user.company.name}</td>
      <td className={cl(cellBaseClass)}>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(user);
            }}
            className={editButtonClass}
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(user.id);
            }}
            className={deleteButtonClass}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};
