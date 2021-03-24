import { createContext, useContext, useReducer } from "react";

const initValues = {
  isOpen: false,
  createState: {
    firstName: "test",
    lastName: "test",
    description: "test-am/email-invites",
    born: "Jan 2nd",
    died: "Jan 3rd",
    bio: "one helluva test",
    homeTown: "LA",
    coverPhoto: "http://profilepic",
    pageTheme: "#FF7F59",
  },
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
