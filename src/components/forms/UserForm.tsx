import React, { useState } from "react";
import { DetailedUser } from "../../types";
import { inputClass, editButtonClass, readOnly as readOnlyCss, sectionTitle, label as labelCss  } from "../../constants";
import clsx from "clsx";

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
    if (!readOnly) onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 max-h-none overflow-visible ${readOnly ? readOnlyCss : ""}`}
    >
      {/* --- BASIC INFO --- */}
      <section>
        <h3 className={sectionTitle}>Basic Information</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            ["Name", "name"],
            ["Username", "username"],
            ["Email", "email"],
            ["Phone", "phone"],
            ["Website", "website"],
          ].map(([label, path]) => (
            <label key={path} className="block">
              <span className={labelCss}>{label}</span>
              <input
                type="text"
                value={path.split(".").reduce((o: any, k) => (o ? o[k] : ""), formData) || ""}
                onChange={(e) => handleChange(path, e.target.value)}
                className={`${inputClass} ${readOnly ? "bg-gray-100 cursor-default" : ""}`}
                readOnly={readOnly}
              />
            </label>
          ))}
        </div>
      </section>

      {/* --- ADDRESS --- */}
      <section>
        <h3 className={sectionTitle}>Address</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            ["Street", "address.street"],
            ["Suite", "address.suite"],
            ["City", "address.city"],
            ["Zipcode", "address.zipcode"],
            ["Latitude", "address.geo.lat"],
            ["Longitude", "address.geo.lng"],
          ].map(([label, path]) => (
            <label key={path} className="block">
              <span className={labelCss}>{label}</span>
              <input
                type="text"
                value={path.split(".").reduce((o: any, k) => (o ? o[k] : ""), formData) || ""}
                onChange={(e) => handleChange(path, e.target.value)}
                className={`${inputClass} ${readOnly ? "bg-gray-100 cursor-default" : ""}`}
                readOnly={readOnly}
              />
            </label>
          ))}
        </div>
      </section>

      {/* --- COMPANY --- */}
      <section>
        <h3 className={sectionTitle}>Company</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            ["Name", "company.name"],
            ["Catch Phrase", "company.catchPhrase"],
            ["Business", "company.bs"],
          ].map(([label, path]) => (
            <label key={path} className="block">
              <span className={labelCss}>{label}</span>
              <input
                type="text"
                value={path.split(".").reduce((o: any, k) => (o ? o[k] : ""), formData) || ""}
                onChange={(e) => handleChange(path, e.target.value)}
                className={`${inputClass} ${readOnly ? "bg-gray-100 cursor-default" : ""}`}
                readOnly={readOnly}
              />
            </label>
          ))}
        </div>
      </section>

      {/* --- ACTION BUTTONS --- */}
      {!readOnly && (
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      )}
    </form>
  );
};

