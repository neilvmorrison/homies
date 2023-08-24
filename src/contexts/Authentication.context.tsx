import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { User } from "firebase/auth";
import { authenticateUser, logoutUser as logout } from "@/services/auth";
import { auth } from "@/config/auth";

export interface IAuthenticationProvider {
  children: ReactNode | ReactNode[];
}

export interface IAuthenticationContext {
  isAuthenticated: boolean;
  isLoading: boolean;
  loginUser: () => Promise<void>;
  logoutUser: () => Promise<void>;
  userObject: any;
  error: any;
}

const AuthenticationContext = createContext<IAuthenticationContext>({
  isAuthenticated: false,
  isLoading: true,
  loginUser: () => Promise.resolve(),
  logoutUser: () => Promise.resolve(),
  userObject: {},
  error: null,
});

function AuthenticationProvider({ children }: IAuthenticationProvider) {
  const [userObject, setUserObject] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function loginUser(): Promise<void> {
    try {
      const authResponse = await authenticateUser();
      setUserObject(authResponse.user);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function logoutUser() {
    await logout();
  }

  useEffect(() => {
    async function getAuthState() {
      auth.onAuthStateChanged((user) => {
        setUserObject(user);
      });
    }
    setIsLoading(true);
    getAuthState();
    setIsLoading(false);
  }, []);

  console.log(userObject);

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!userObject,
        userObject,
        error,
        isLoading,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export const useAuthenticationContext = () => useContext(AuthenticationContext);

export default AuthenticationProvider;
