import 
//React, 
{ Component } from 'react';
import { Plus } from "lucide-react";
import clsx from "clsx";
import { addUserBaseClass, sizeClasses, iconSizes } from "../../constants/index";
interface AddUserProps {
    onAdd: () => void;
    size?: string;
    className?: string;
  }
//export const AddUserButton: React.FC<AddUserProps> = (
     // { onAdd, size = "md", className = "bottom-20 right-20" }) => {
export class AddUserButton extends Component<AddUserProps> { render() {//
  const { onAdd, size = "md", className = "" } = this.props;//
  const buttonClass = clsx(addUserBaseClass, sizeClasses[size], className);
  const iconSize = iconSizes[size];
  return (
        <button
        type="button"
        onClick={() => onAdd()}
        className={buttonClass}
        title="Add New User"
        aria-label="Add new user"
      >
        <Plus size={iconSize} strokeWidth={2.5} />
      </button>
  );
  }
}
//}
