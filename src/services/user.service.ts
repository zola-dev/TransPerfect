import { httpClient, User } from "../index";
class UserService {
  private endpoint = "/users";
  async getUsers(): Promise<User[]> {
    try {
      const response = await httpClient.get<User[]>(this.endpoint);
      return response.data;
    } catch (error) {
      console.error("[UserService] Error fetching users:", error);
      throw error;
    }
  }
  async getUserById(id: number): Promise<User> {
    try {
      const response = await httpClient.get<User>(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`[UserService] Error fetching user ${id}:`, error);
      throw error;
    }
  }
  async updateUser(id: number, user: Partial<User>): Promise<User> {
    try {
      const response = await httpClient.put<User>(
        `${this.endpoint}/${id}`,
        user
      );
      return response.data;
    } catch (error) {
      console.error(`[UserService] Error updating user ${id}:`, error);
      throw error;
    }
  }
  async deleteUser(id: number): Promise<void> {
    try {
      await httpClient.delete(`${this.endpoint}/${id}`);
      console.log(`[UserService] User ${id} deleted successfully`);
    } catch (error) {
      console.error(`[UserService] Error deleting user ${id}:`, error);
      throw error;
    }
  }
}
export const userService = new UserService();
