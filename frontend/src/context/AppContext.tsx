import React, { useContext, useState } from 'react';
import Toast from '../components/toast';


type ToastMessage = {
   message: string;
   type: "SUCCESS" | "ERROR" 
}
type AppContext =  {
  showToast: (toastMessage: ToastMessage) => void;  
  updateLoggedIn: (value: Boolean) => void;
  isLoggedIn: boolean;
}

 // @ts-ignore
const AppContext = React.createContext<AppContext>({});

export const AppContextProvider = ({ children}: any) => {

  const [toast, setToast] = useState<ToastMessage | undefined >(undefined); 
  const [isLoggedIn, updateLoggedIn] = useState(false); 
  //  const {isError} = useQuery('validateToken', apiClient.validateToken, {
  //    retry: false
  //  });


  return (
      <AppContext.Provider value={{ 
          showToast: (data: any) => {
           setToast(data);
          },
          updateLoggedIn: (value: any) => updateLoggedIn(value),
          isLoggedIn
      }}>
        { toast && <Toast message={toast.message} type={toast.type} hideToast={() => setToast(undefined)} />}
        {children}
      </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
}