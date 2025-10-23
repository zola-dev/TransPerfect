import React, { useState } from "react";
import { DetailedUser } from "../../types";
import { inputClass, editButtonClass } from "../../constants";

interface UserFormProps {
  user: DetailedUser | null;
  onSave: (userData: DetailedUser) => void;
  onCancel: () => void;
  readOnly: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
  user,
  onSave,
  onCancel,
  readOnly,
}) => {
  const [formData, setFormData] = useState<DetailedUser>(
    user || {
      id: 0,
      name: "",
      username: "",
      email: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: { lat: "", lng: "" },
      },
      phone: "",
      website: "",
      company: {
        name: "",
        catchPhrase: "",
        bs: "",
      },
    }
  );

  const handleChange = (path: string, value: string) => {
    const keys = path.split(".");
    setFormData((prev: DetailedUser) => {
      const newData = { ...prev };
      let current: any = newData;
      keys.slice(0, -1).forEach((key) => {
        current[key] = { ...current[key] };
        current = current[key];
      });
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-h-[70vh] overflow-y-auto"
    >
      {/* Basic Info */}
      <input
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        className={inputClass}
        readOnly={readOnly}
      />
      <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => handleChange("username", e.target.value)}
        className={inputClass}
        readOnly={readOnly}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        className={inputClass}
        readOnly={readOnly}
      />

      {/* Address */}
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="Street"
          value={formData.address.street}
          onChange={(e) => handleChange("address.street", e.target.value)}
          className={inputClass}
          readOnly={readOnly}
        />
        <input
          type="text"
          placeholder="Suite"
          value={formData.address.suite}
          onChange={(e) => handleChange("address.suite", e.target.value)}
          className={inputClass}
          readOnly={readOnly}
        />
        <input
          type="text"
          placeholder="City"
          value={formData.address.city}
          onChange={(e) => handleChange("address.city", e.target.value)}
          className={inputClass}
          readOnly={readOnly}
        />
        <input
          type="text"
          placeholder="Zipcode"
          value={formData.address.zipcode}
          onChange={(e) => handleChange("address.zipcode", e.target.value)}
          className={inputClass}
          readOnly={readOnly}
        />
        <input
          type="text"
          placeholder="Latitude"
          value={formData.address.geo.lat}
          onChange={(e) => handleChange("address.geo.lat", e.target.value)}
          className={inputClass}
          readOnly={readOnly}
        />
        <input
          type="text"
          placeholder="Longitude"
          value={formData.address.geo.lng}
          onChange={(e) => handleChange("address.geo.lng", e.target.value)}
          className={inputClass}
          readOnly={readOnly}
        />
      </div>

      {/* Company */}
      <input
        type="text"
        placeholder="Company Name"
        value={formData.company.name}
        onChange={(e) => handleChange("company.name", e.target.value)}
        className={inputClass}
        readOnly={readOnly}
      />
      <input
        type="text"
        placeholder="Catch Phrase"
        value={formData.company.catchPhrase}
        onChange={(e) => handleChange("company.catchPhrase", e.target.value)}
        className={inputClass}
        readOnly={readOnly}
      />
      <input
        type="text"
        placeholder="Business (bs)"
        value={formData.company.bs}
        onChange={(e) => handleChange("company.bs", e.target.value)}
        className={inputClass}
        readOnly={readOnly}
      />

      {/* Other */}
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        className={inputClass}
        readOnly={readOnly}
      />
      <input
        type="url"
        placeholder="Website"
        value={formData.website}
        onChange={(e) => handleChange("website", e.target.value)}
        className={inputClass}
        readOnly={readOnly}
      />
      {/* Button*/}
      <div className="flex justify-end gap-3 mt-4">
        {!readOnly && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        )}
        {!readOnly && (
          <button type="submit" className={editButtonClass}>
            Save
          </button>
        )}
      </div>
    </form>
  );
};
