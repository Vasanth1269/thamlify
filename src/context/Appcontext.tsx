import { createContext, useState, ReactNode } from "react";
import { useEffect } from "react";
import axios from "axios";

// Define the shape of your context
interface AppContextType {
  backendUrl: string;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  userData: any; // You can replace 'any' with your actual user type
  setUserData: (data: any) => void;
  checkAuth: () => Promise<void>
}

// Create context with undefined initial value
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Props type for the provider
interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const backendUrl = import.meta.env.VITE_API_URL as string;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);

  const checkAuth = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/auth/is-auth`,
        { withCredentials: true }
      );

      if (data.success) {
        setIsLoggedIn(true)
        setUserData(data.user);
      }
    } catch {
      setIsLoggedIn(false);
      setUserData(null);
    }
  };

  
useEffect(()=>{
  checkAuth();
},[])

  const value: AppContextType = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    checkAuth,
   
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

