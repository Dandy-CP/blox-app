import { createContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { AuthBody } from '@/types/auth/auth.types';

interface Props {
  children: React.ReactNode;
}

export type AuthContextType = {
  authData: string | null;
  signIn: (access: AuthBody, isRemembered: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  isAuth: () => Promise<void>;
};

const authContextDefaultValues: AuthContextType = {
  authData: null,
  signIn: async (access: AuthBody, isRemembered: boolean) => {},
  signOut: async () => {},
  isAuth: async () => {},
};

export const AuthContext = createContext<AuthContextType>(
  authContextDefaultValues
);

const AuthProvider = ({ children }: Props) => {
  const [authData, setAuthData] = useState<string | null>(null);
  const router = useRouter();

  const signIn = async (access: AuthBody, isRemembered: boolean) => {
    try {
      const { token } = access;

      if (isRemembered) {
        Cookies.set('token', token, {
          expires: 7,
          secure: true,
        });
      }

      if (!isRemembered) {
        Cookies.set('token', token);
      }

      setAuthData(token);
      router.replace('/');
      toast.success('Login success');
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      Cookies.remove('token');
      setAuthData(null);
      router.replace('/auth');
      toast.success('Logout success');
    } catch (error) {
      console.log(error);
    }
  };

  const isAuth = async () => {
    try {
      const tokenValue = Cookies.get('token');

      if (tokenValue !== undefined) {
        setAuthData(tokenValue);
      } else {
        setAuthData(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  const valueContext = useMemo(
    () => ({
      authData,
      signIn,
      signOut,
      isAuth,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authData]
  );

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
