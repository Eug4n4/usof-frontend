// import { createContext, useReducer, useContext } from "react";

// const PostContext = createContext();

// export function PostProvider({ children }) {
//   const [state, dispatch] = useReducer(postReducer, {
//     posts: [],
//     loading: true,
//     page: 1,
//     pageSize: 5,
//     query: "",
//   });
//   return (
//     <PostContext.Provider value={{ state, dispatch }}>
//       {children}
//     </PostContext.Provider>
//   );
// }

// function postReducer(state, action) {
//   console.log(action.type);
//   switch (action.type) {
//     case "load":
//       return { ...state, loading: action.data };
//     case "set":
//       return { ...state, posts: action.data };
//     case "page":
//       return { ...state, page: action.data };
//     case "pageSize":
//       return { ...state, pageSize: action.data };
//     case "query":
//       return { ...state, query: action.data };
//     default:
//       throw new Error(`Unknown action type ${action.type}`);
//   }
// }

// export function usePosts() {
//   return useContext(PostContext);
// }
