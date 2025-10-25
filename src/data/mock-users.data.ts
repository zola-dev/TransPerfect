import { User } from '../index';
export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1-770-736-8031",
    website: "johndoe.com",
    company: { name: "Tech Corp" }
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "010-692-6593",
    website: "janesmith.com",
    company: { name: "Design Studio" }
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phone: "1-463-123-4447",
    website: "bobjohnson.com",
    company: { name: "Marketing Solutions" }
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice.w@example.com",
    phone: "493-170-9623",
    website: "alicew.com",
    company: { name: "Data Analytics Inc" }
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    phone: "1-477-935-8478",
    website: "charlieb.com",
    company: { name: "Cloud Services Ltd" }
  }
];