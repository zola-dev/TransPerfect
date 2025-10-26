import { FilterOptions, DetailedUser } from "../types";
/**
 * Filters and sorts an array of users based on provided filter options.
 * 
 * Filtering:
 * - Searches across name, email, and city fields
 * - Supports case-sensitive and case-insensitive matching
 * - Supports wildcard (contains) or exact prefix matching
 * 
 * Sorting:
 * - Sorts alphabetically by name, email, or company name
 * 
 * @param users - Array of DetailedUser objects to filter and sort
 * @param filters - Filter configuration object
 * @param filters.searchTerm - Text to search for in name, email, and city
 * @param filters.caseSensitive - If true, performs case-sensitive search
 * @param filters.wildcard - If true, matches anywhere in text (contains). If false, matches from start (prefix)
 * @param filters.sortBy - Field to sort by: "name", "email", or "company"
 * 
 * @returns Filtered and sorted array of users
 * 
 * @example
 * const filtered = filterAndSortUsers(allUsers, {
 *   searchTerm: "Zola",
 *   sortBy: "name",
 *   caseSensitive: false,
 *   wildcard: true
 * });
 */
export const filterAndSortUsers = (
  users: DetailedUser[],
  filters: FilterOptions
): DetailedUser[] => {
  let result = [...users];
  if (filters.searchTerm.trim()) {
    const term = filters.caseSensitive
      ? filters.searchTerm
      : filters.searchTerm.toLowerCase();
    result = result.filter((user) => {
      const name = filters.caseSensitive ? user.name : user.name.toLowerCase();
      const email = filters.caseSensitive
        ? user.email
        : user.email.toLowerCase();
      const city =
        "address" in user && user.address
          ? filters.caseSensitive
            ? user.address.city
            : user.address.city.toLowerCase()
          : "";
      const searchFn = filters.wildcard
        ? (text: string) => text.includes(term)
        : (text: string) => text.startsWith(term);
      return searchFn(name) || searchFn(email) || searchFn(city);
    });
  }
  result.sort((a, b) => {
    let aValue: string;
    let bValue: string;
    if (filters.sortBy === "company") {
      aValue = a.company.name;
      bValue = b.company.name;
    } else {
      aValue = a[filters.sortBy];
      bValue = b[filters.sortBy];
    }
    return aValue.localeCompare(bValue);
  });
  return result;
};
