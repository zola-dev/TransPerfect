// src/components/user/UserDetails.tsx
import React, { Component } from "react";
import { User, DetailedUser } from "../../types";
import { sectionTitle, label } from "../../constants/index";
interface UserDetailsProps {
  user: User | DetailedUser | null;
  isOpen: boolean;
  toggle: (user: User | DetailedUser | null) => void;
}
export const UserDetails: React.FC<UserDetailsProps> = ({
           user, isOpen, toggle }) => {
// export class UserDetails extends Component<UserDetailsProps> {//
  //handleOverlayClick = 
  const handleOverlayClick = 
  (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      //this.props.toggle(null);
      toggle(null);
    }
  };
//render() {//
//const { user, isOpen, toggle } = this.props;
    if (!isOpen || !user) return null;
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        //onClick={this.handleOverlayClick}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
            <h2 className="text-2xl font-bold">User Details</h2>
            <button
              onClick={() => toggle(null)}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div>
                <h3 className={sectionTitle}>Basic Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className={label}>ID</label>
                    <p className="text-gray-900">{user.id}</p>
                  </div>
                  <div>
                    <label className={label}>Name</label>
                    <p className="text-gray-900">{user.name}</p>
                  </div>
                  <div>
                    <label className={label}>Email</label>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className={label}>Phone</label>
                    <p className="text-gray-900">{user.phone}</p>
                  </div>
                  <div>
                    <label className={label}>Website</label>
                    {"website" in user && user.website ? (
                      <p className="text-gray-900">
                        <a
                          href={`https://${user.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {user.website}
                        </a>
                      </p>
                    ) : (
                      <p className="text-gray-900">N/A</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div>
                <h3 className={sectionTitle}>Company Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className={label}>Company Name</label>
                    <p className="text-gray-900">{user.company.name}</p>
                  </div>
                  {"address" in user && user.address && (
                    <>
                      <div>
                        <label className={label}>Address</label>
                        <p className="text-gray-900">
                          {user.address.street}, {user.address.suite}
                        </p>
                        <p className="text-gray-900">
                          {user.address.city}, {user.address.zipcode}
                        </p>
                      </div>
                      <div>
                        <label className={label}>Coordinates</label>
                        <p className="text-gray-900">
                          Lat: {user.address.geo.lat}, Lng:{" "}
                          {user.address.geo.lng}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t flex justify-end">
              <button
                onClick={() => toggle(null)}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }//
// }//

