import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { UserForm } from "../forms/UserForm";
import { User, DetailedUser } from "../../types/user.types";

interface UserFormModalProps {
  toggle: () => void;
  user: DetailedUser | null;
  mode: "view" | "edit" | "add";
  onSave: (userData: DetailedUser) => void;
}

const UserFormModal: React.FC<UserFormModalProps> = ({
  toggle,
  user,
  mode,
  onSave,
}) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) toggle();
  };

  return (
    <motion.div
      onClick={handleOverlayClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 "
    >
      <motion.div
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-xl relative"
      >
        <button
          onClick={toggle}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {mode === "add" && "Add New User"}
          {mode === "edit" && "Edit User"}
          {mode === "view" && "View User"}
        </h2>

        <UserForm user={user} onSave={onSave} onCancel={toggle} readOnly={mode === "view"} />
      </motion.div>
    </motion.div>
  );
};

export default UserFormModal;
