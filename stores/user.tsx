import { create } from 'zustand';
import { User } from '../types/types';

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

interface UserActions {
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  removeUser: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserState & UserActions>((set) => ({
  // State
  users: [],
  isLoading: false,
  error: null,

  // Actions
  setUsers: (users) => set({ users, error: null }),
  
  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
      error: null,
    })),
  
  updateUser: (id, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      ),
      error: null,
    })),
  
  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
      error: null,
    })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
}));