// import { validateArgCount } from '@firebase/util';
import React,{useState,createContext,useContext} from 'react'

const UiContext = () => createContext({
    createClassDialog:false,
});
export const useUiContext = () => useContext(UiContext);

export const UiControlContext = ({children}) => {
    const [createClassDialog, setCreateClassDialog] = useState(false);
    const value = {
    createClassDialog,
    setCreateClassDialog,
    }
  return (
    <UiControlContext.Provider value={value}>
        {children}
    </UiControlContext.Provider>
  )
}
