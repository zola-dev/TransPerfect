import { User, FilterOptions, DetailedUser } from "../types";
export const filterAndSortUsers = (
  users: DetailedUser[],
  // | User[],
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
