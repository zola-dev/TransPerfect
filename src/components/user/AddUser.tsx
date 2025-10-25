import React from "react";
import { Plus } from "lucide-react";
import { iconSize, buttonClass, AddUserProps } from "../../index";
export const AddUserButton: React.FC<AddUserProps> = ({
  onAdd,
  size = "md",
  className = "bottom-20 right-20",
}) => {
  return (
    <button
      type="button"
      onClick={() => onAdd()}
      className={buttonClass(size, className)}
      title="Add New User"
      aria-label="Add new user"
    >
      <Plus size={iconSize(size)} strokeWidth={2.5} />
    </button>
  );
};
