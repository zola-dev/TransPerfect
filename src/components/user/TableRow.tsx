import {
  //React,
  Component,
} from "react";
import { User } from "../../types";
import clsx from "clsx";
import {
  cellBaseClass,
  textGray900,
  textGray600,
  editButtonClass,
  deleteButtonClass,
} from "../../constants/index";
interface TableRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onViewDetails: (user: User) => void;
}
export const TableRow: React.FC<TableRowProps> = ({
           user, onEdit, onDelete, onViewDetails }) => {
// export class TableRow extends Component<TableRowProps> { render() {//
// const { user, onEdit, onDelete, onViewDetails } = this.props; //
     return (
      <tr
        onClick={() => onViewDetails(user)}
        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <td className={clsx(cellBaseClass, textGray900)}>{user.id}</td>
        <td className={clsx(cellBaseClass, textGray900)}>{user.name}</td>
        <td className={clsx(cellBaseClass, textGray600)}>{user.email}</td>
        <td className={clsx(cellBaseClass, textGray600)}>{user.phone}</td>
        <td className={clsx(cellBaseClass, textGray600)}>
          {user.company.name}
        </td>
        <td className={clsx(cellBaseClass)}>
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
   } 
//}//

