export function createTodo(body) {
  return {
    type: "CREATE_TODO",
    payload: body,
  };
}

export function deleteTodo(modalInfo) {
  return {
    type: "DELETE_TODO",
    payload: modalInfo,
  };
}

export function editTodo(body, modalInfo) {
  return {
    type: "EDIT_TODO",
    payload: {
      body,
      modalInfo,
    },
  };
}
