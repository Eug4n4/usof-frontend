import { createContext, useReducer, useContext } from "react";

const PostContext = createContext();

export function PostProvider({ children }) {
  const [state, dispatch] = useReducer(postReducer, {
    posts: [],
    loading: true,
  });
  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
}

function postReducer(state, action) {
  switch (action.type) {
    case "load":
      return { ...state, loading: action.data };
    case "set":
      return { ...state, posts: action.data };
    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
}

export function usePosts() {
  return useContext(PostContext);
}
