import { createContext, useState } from "react";

export type EditModeContextType = {
  editMode: boolean;
  setEditMode: (value: boolean) => void;
};

export const EditModeContext = createContext<EditModeContextType | null>(null);

const EditModeContextProvider = ({ children }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <EditModeContext.Provider value={{ editMode, setEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
};

export default EditModeContextProvider;
