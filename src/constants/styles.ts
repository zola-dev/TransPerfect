import clsx from "clsx";
//components
//user
//AddUserButton{
export const cl = clsx; 
export const sizeClasses: Record<string, string> = {
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
};
export const addUserBaseClass =
  "rounded-full shadow-lg flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white transition-transform duration-200 hover:scale-110 z-50";
export const iconSizes: Record<string, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};
export const iconSize = (size: keyof typeof iconSizes): number => {
  return iconSizes[size];
};
// const buttonClass = clsx(addUserBaseClass, sizeClasses[size], className);
export const buttonClass = (
  size: keyof typeof sizeClasses,
  className?: string
) => {
  return clsx(addUserBaseClass, sizeClasses[size], className);
};
//}
//DataTable{
export const tableHeaderCell =
  "px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider";
//}
//FilterBar{
export const inputClass = clsx(
  "w-full px-4 py-2 border border-gray-300 rounded-md",
  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
);
//}
//TableRow{
// Table cell classes
export const cellBaseClass = "px-6 py-4 text-sm";
export const textGray900 = "text-gray-900 font-medium";
export const textGray600 = "text-gray-600";
// Table buttons
export const buttonBaseClass =
  "px-3 py-1.5 text-xs font-medium rounded-md shadow-sm transition-colors";
export const editButtonClass = clsx(
  buttonBaseClass,
  "bg-blue-600 text-white hover:bg-blue-700"
);
export const deleteButtonClass = clsx(
  buttonBaseClass,
  "bg-red-600 text-white hover:bg-red-700"
);
//}
//UserDetails{
export const sectionTitle =
  "text-lg font-semibold text-gray-800 mb-3 border-b pb-2";
export const label = "text-sm font-medium text-gray-500";
//}
//Modals
//UserForm
export const readOnly = "pointer-events-none opacity-90 select-none";
