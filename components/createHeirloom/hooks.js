import { createContext, useContext, useReducer, useState } from "react";

const initValues = {
  isOpen: false,
  createState: {
    firstName: "",
    lastName: "",
    description: "",
    born: "",
    died: "",
    bio: "",
    homeTown: "Anytown, USA",
    coverPhoto: "",
    pageTheme: "#FF7F59",
  },
  emails: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        ...state,
        createState: { ...state.createState, [action.name]: action.value },
      };
    case "OPEN":
      return {
        ...state,
        isOpen: true,
      };
    case "CLOSE":
      return {
        ...state,
        isOpen: false,
      };
    case "ADD_EMAIL":
      return {
        ...state,
        emails: [...state.emails, action.value],
      };
    case "DELETE_EMAIL":
      return {
        ...state,
        emails: state.emails.filter((email) => email != action.value),
      };
    default:
      return state;
  }
};

const HeirloomCreateContext = createContext(initValues);

export function CreateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initValues);
  return (
    <HeirloomCreateContext.Provider value={[state, dispatch]}>
      {children}
    </HeirloomCreateContext.Provider>
  );
}

export function useHeirloomCreatContext() {
  return useContext(HeirloomCreateContext);
}

export function useDragAndDrop() {
  const [inDropZone, setInDropZone] = useState(false);
  const [file, setFile] = useState();

  return {
    inDropZone,
    enterDropZone: () => setInDropZone(true),
    leaveDropZone: () => setInDropZone(false),
    setFile,
    file,
  };
}
