import 
//React, 
{ Component, 
//useState, useMemo, useEffect
} from 'react';
import { FilterOptions, User, DetailedUser, ApiError } from './types';
//import { useUsers } from './hooks';
import { filterAndSortUsers } from './utils';
import { LoadingSpinner, FilterBar, DataTable, AddUserButton, UserDetails } from './components';
//import { userService } from './services';//for real API
import { filter, take } from "rxjs/operators";
import './App.css';

// const App: React.FC = () => {
//   const { users: fetchedUsers, loading, error, useMockData, setUseMockData } = useUsers();
//   const [users, setUsers] = useState<User[]>([]);
//   useEffect(() => {
//     setUsers(fetchedUsers);
//   }, [fetchedUsers]);
//   const [filters, setFilters] = useState<FilterOptions>({
//     searchTerm: '',
//     sortBy: 'name',
//     caseSensitive: false, 
//     wildcard: false,
//   });
//   const [selectedUser, setSelectedUser] = useState<User | DetailedUser | null>(null);
//   const filteredUsers = useMemo(
//     () => filterAndSortUsers(users, filters),
//     [users, filters]
//   ); 

import { useUsersService, UseUsersState } from './services/useUsers.service';
interface AppState {//class based approach
  users: User[];
  fetchedUsers: User[];
  loading: boolean;
  error: ApiError | null;
  useMockData: boolean;
  filters: FilterOptions;
  selectedUser: User | DetailedUser | null;
}
class App extends Component<{}, AppState> {
  state: AppState = {
    users: [],
    fetchedUsers: [],
    loading: true,
    error: null,
    useMockData: false,
    filters: {
      searchTerm: '',
      sortBy: 'name',
      caseSensitive: false,
      wildcard: false,
    },
    selectedUser: null,
  };
  componentDidMount() {
    useUsersService.stateObservable.subscribe((state: UseUsersState) => {
      this.setState({
        users: state.users,
        loading: state.loading,
        error: state.error,
        useMockData: state.useMockData,
      });
    });
    useUsersService.stateObservable
      .pipe(
        filter((state: UseUsersState) => !state.loading),
        take(1)
      )
      .subscribe((state: UseUsersState) => {
        this.setState({ ...state });
      });
    useUsersService.fetchUsers();
  }
  setFilters = (filters: AppState["filters"]) => {
    this.setState({ filters });
  };

  //const 
  addUser = async () => {
  const name = prompt('Name:');
  if (!name) return;
  const email = prompt('Email:');
  if (!email) return;
  const phone = prompt('Phone:');
  if (!phone) return;
  const company = prompt('Company name:');
  if (!company) return;
  //const id = users.length > 0 
  const id = this.state.users.length > 0 //
  // ? Math.max(...users.map(u => u.id)) + 1 
  ? Math.max(...this.state.users.map(u => u.id)) + 1 
  : 1;
  const user: User = { id, name, email, phone, company:{name:company} };
  //setUsers(prevUsers => [...prevUsers, user]);
  this.setState(prevState => ({ users: [...prevState.users, user] }));//
  // await userService.addUser(user);//for real API
  alert('User added successfully!');
  };

  //const 
  handleEdit = async (user: User) => {
  const newName = prompt('New name:', user.name);
  if (!newName) return;
  const updatedUser = { ...user, name: newName };//
  // setUsers(prevUsers =>
  //   prevUsers.map(u => u.id === user.id ? updatedUser : u)
  // );
  this.setState(prevState => ({ users: prevState.users.map(u => u.id === user.id ? updatedUser : u) }));//
  //await userService.updateUser(user.id, updatedUser);//for real API
  };

  //const 
  handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      // setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      this.setState(prevState => ({ users: prevState.users.filter(u => u.id !== id) }));//
      //await userService.deleteUser(id);//for real API
      alert('User deleted successfully!');
    } catch (error) {
      alert('Failed to delete user. Please try again.');
      console.error('Delete error:', error);
    }
  };
  
  //const 
  toggleUserDetails = (user: User | DetailedUser | null) => 
    // setSelectedUser(user);
    this.setState({ selectedUser: user });//

    render() {//
      const { users, loading, error, useMockData, filters, selectedUser } = this.state;//
      const filteredUsers = filterAndSortUsers(users, filters);//

  if (  loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            User Management System
          </h1>
          <p className="text-gray-600">
            Manage and view user information with advanced filtering
          </p>
        </header>

        {/* Data Source Toggle */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-blue-900">
                Data Source: {useMockData ? 'Mock Data' : 'Live API'}
              </span>
              {error && !useMockData && (
                <span className="text-xs text-red-600">(API failed, using mock data)</span>
              )}
            </div>
            <button
              //onClick={() => setUseMockData(!useMockData)}
              onClick={() => useUsersService.setUseMockData(!useMockData)}//
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Switch to {useMockData ? 'Live API' : 'Mock Data'}
            </button>
          </div>
        </div>

        <FilterBar
          filters={filters}
          //onFilterChange={setFilters}
          onFilterChange={this.setFilters}//
          totalCount={users.length}
          filteredCount={filteredUsers.length}
          onAddUser={this.addUser} 
        />
        <DataTable
          users={filteredUsers}
          //onEdit={handleEdit}
          onEdit={this.handleEdit}//
          //onDelete={handleDelete}
          onDelete={this.handleDelete}//
          //onViewDetails={(user: User) => setSelectedUser(user)}
          onViewDetails={(user: User) => this.setState({ selectedUser: user })}//
        />
        <UserDetails
          user={selectedUser}
          isOpen={!!selectedUser}
          //toggle={toggleUserDetails}
          toggle={this.toggleUserDetails}//
        />
      </div>
    </div>
  );
}//
}//
//};

export default App;