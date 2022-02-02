import { createContext, useEffect } from 'react';
import { useState } from 'react';

import { Buffer } from 'buffer';

import Cookies from 'js-cookie';

type AuthContextType = {
  authenticatedUser: UserType;
  signIn: (data: SignInData) => Promise<string>;
  logout: () => Promise<void>;
};

type SignInData = {
  email: string;
  password: string;
};

type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  document: string;
  password: string;
  role: string;
  photo: string;
};

type PayloadType = {
  user_id: number;
  role: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [authenticatedUser, setAuthenticatedUser] = useState<UserType>({} as UserType);

  useEffect(() => {
    const tokenAlreadyExists = Cookies.get('token');

    if (tokenAlreadyExists) {
      verifyToken(tokenAlreadyExists);  
    } else {
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      };
    };
  }, []);

  async function getUsers(): Promise<UserType[]> {
    const users = await fetch('http://localhost:3001/users')
      .then(response => response.json())
      .then(response => {
        return response;
      })
      .catch(err => {
        alert(JSON.stringify(err));
      })

    return users;
  };

  async function verifyToken(token: string) {
    const users = await getUsers();

    const tokenIsValid = () => {
      const decodedToken: PayloadType = JSON.parse(atob(token));

      const userIdExists = users.filter(user => user.id === decodedToken.user_id)[0];

      if (userIdExists) {
        const tokenRoleIsCorrectRole = decodedToken.role === userIdExists.role;

        setAuthenticatedUser(userIdExists);

        return tokenRoleIsCorrectRole;
      } else {
        return false;
      }
    };

    if (tokenIsValid()) {
      if (window.location.pathname === '/') {
        window.location.href = '/users';
      }
    } else {
      Cookies.remove('token');

      window.location.href = '/';
    }
  }

  async function signIn({ email, password }: SignInData) {
    const users = await getUsers();

    const user: UserType = users.filter(user => user.email === email)[0];
    
    if (!user) {
      return 'Falha na autenticação, e-mail ou senha inválida.';
    };

    const token = await generateToken(user, password);

    if (!token) {
      return 'Falha na autenticação, e-mail ou senha inválida.';
    }

    Cookies.set('token', token);

    setAuthenticatedUser(user);

    window.location.href = '/users';
  }

  async function generateToken(user: UserType, password: string) {
    const base64Password = btoa(password);

    if (base64Password === user.password) {
      const payload = {
        role: user.role,
        user_id: user.id
      };

      const token = Buffer.from(JSON.stringify(payload)).toString("base64");

      return token;
    } else {
      return null;
    }
  }

  async function logout() {
    Cookies.remove('token');

    window.location.href = '/';
  }

  return (
    <AuthContext.Provider value={{ signIn, logout, authenticatedUser }}>
      {children}
    </AuthContext.Provider>
  );
}