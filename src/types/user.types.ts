export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website?: string;
    company: {
      name: string;
    };
  }
  export interface Geo {
    lat: string;
    lng: string;
  }
  export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
  }
  export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
  }
  export interface DetailedUser extends User {
    username: string;
    address: Address;
    company: Company; 
    website: string; //required! here
  }
  export interface FilterOptions {
    searchTerm: string;
    sortBy: keyof Pick<User, 'name' | 'email'> | 'company';
    caseSensitive: boolean; 
    wildcard: boolean; 
  }