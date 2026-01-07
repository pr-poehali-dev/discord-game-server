export type User = {
  username: string;
  password: string;
  role: 'admin' | 'user';
  status: string;
};

const USERS_KEY = 'brickrigs_users';
const CURRENT_USER_KEY = 'brickrigs_current_user';

const DEFAULT_USERS: User[] = [
  {
    username: 'TOURIST-WAGNERA',
    password: 'admin123',
    role: 'admin',
    status: 'Глава сервера'
  }
];

export const getUsers = (): User[] => {
  const stored = localStorage.getItem(USERS_KEY);
  if (!stored) {
    localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  }
  return JSON.parse(stored);
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const login = (username: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    setCurrentUser(user);
    return user;
  }
  return null;
};

export const register = (username: string, password: string): User | null => {
  const users = getUsers();
  
  if (users.find(u => u.username === username)) {
    return null;
  }
  
  const newUser: User = {
    username,
    password,
    role: 'user',
    status: 'Участник'
  };
  
  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);
  
  return newUser;
};

export const logout = () => {
  setCurrentUser(null);
};

export const promoteToAdmin = (username: string, status: string): boolean => {
  const users = getUsers();
  const user = users.find(u => u.username === username);
  
  if (user) {
    user.role = 'admin';
    user.status = status;
    saveUsers(users);
    return true;
  }
  
  return false;
};

export const demoteFromAdmin = (username: string): boolean => {
  const users = getUsers();
  const user = users.find(u => u.username === username);
  
  if (user && user.username !== 'TOURIST-WAGNERA') {
    user.role = 'user';
    user.status = 'Участник';
    saveUsers(users);
    return true;
  }
  
  return false;
};
