import produce from "immer";

const INITIAL_STATE = JSON.parse(localStorage.getItem("todos")) || [];

export function todos(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "CREATE_TODO":
        const newTodo = action.payload;
        return [...draft, newTodo];

      case "DELETE_TODO":
        const newTodoList = draft.filter(
          (todo) => todo.id !== action.payload.id
        );
        return newTodoList;

      case "EDIT_TODO":
        const withoutOldTodo = draft.filter(
          (todo) => todo.id !== action.payload.modalInfo.id
        );
        return [...withoutOldTodo, action.payload.body];

      default:
        break;
    }
  });
}
