// Simple localStorage-based authentication
export interface User {
  id: string;
  email: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  createdAt: string;
}

export const auth = {
  getUser: (): User | null => {
    const userStr = localStorage.getItem("current-user");
    return userStr ? JSON.parse(userStr) : null;
  },

  login: (email: string, password: string): User | null => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: User & { password: string }) => u.email === email && u.password === password
    );
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      localStorage.setItem("current-user", JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    }
    return null;
  },

  signup: (email: string, password: string, displayName: string): User => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Check if email already exists
    if (users.some((u: User) => u.email === email)) {
      throw new Error("Email already exists");
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      displayName,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem("current-user", JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  },

  logout: () => {
    localStorage.removeItem("current-user");
  },

  updateProfile: (updates: Partial<User>) => {
    const currentUser = auth.getUser();
    if (!currentUser) return null;

    const updatedUser = { ...currentUser, ...updates };
    localStorage.setItem("current-user", JSON.stringify(updatedUser));

    // Update in users array
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((u: User) => u.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem("users", JSON.stringify(users));
    }

    return updatedUser;
  },
};
