import React, { createContext, useReducer } from 'react'
interface TodoItems {
    id: string;
    text: string;
    compeleted: boolean;
  }
  interface State {
    todos: TodoItems[];
    newTodo: string;
    editingId: string | null;
    editedText: string;
  }
  const initialState: State = {
    todos: [],
    newTodo: "",
    editingId: null,
    editedText: "",
  };
  type Actions =
    | { type: "add_todo"; payload: string }
    | { type: "toggle_todo"; payload: string }
    | { type: "delete_todo"; payload: string }
    | { type: "startEdit_todo"; payload: string }
    | { type: "saveEdit_todo"; payload: { id: string; text: string } }
    | { type: "add_todo"; payload: string }
    | { type: "set_newtodo"; payload: string }
    | { type: "update_editedtext"; payload: string };
  
  function reducer(state: State, action: Actions): State {
    switch (action.type) {
      case "add_todo":
        if (state.newTodo.trim()) {
          return {
            ...state,
            todos: [
              ...state.todos,
              {
                id: Math.random().toString(),
                text: state.newTodo,
                compeleted: false,
              },
            ],
            newTodo: "",
          };
        } else {
          alert("Please enter at least one letter.");
          return state;
        }
      case "set_newtodo":
        return {
          ...state,
          newTodo: action.payload,
        };
  
      case "toggle_todo":
        const updatedTodos = state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, compeleted: !todo.compeleted }
            : todo
        );
        return {
          ...state,
          todos: updatedTodos,
        };
      case "delete_todo":
        return {
          ...state,
          todos: state.todos.filter((todo) => todo.id !== action.payload),
        };
      case "update_editedtext":
        return {
          ...state,
          editedText: action.payload,
        };
      case "startEdit_todo":
        return {
          ...state,
          editingId: action.payload,
        };
      case "saveEdit_todo":
        if (state.editedText.trim()) {
          const updatedTodos = state.todos.map((todo) =>
            todo.id === action.payload.id
              ? { ...todo, text: state.editedText }
              : todo
          );
          return {
            ...state,
            todos: updatedTodos,
            editingId: null,
            editedText: "",
          };
        } else {
          alert("Please enter at least one letter.");
          return state;
        }
      default:
        return state;
    }
  }
  export const TodoContext = createContext<{ state: State; dispatch: React.Dispatch<Actions> }>({
    state: initialState,
    dispatch: () => {},
  });

export default function TodoProvider({children}:{ children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TodoContext.Provider value={{state,dispatch}}>
        {children}

    </TodoContext.Provider>
  )
}