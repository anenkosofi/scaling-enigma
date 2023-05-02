const todosInitialState = [];

export const todosReducer = (state = todosInitialState, { type, payload }) => {
  switch (type) {
    case 'todos/addTodo':
      return [payload, ...state];

    case 'todos/toggleCompleted':
      return state.map(todo =>
        todo.id === payload ? { ...todo, completed: !todo.completed } : todo
      );

    case 'todos/deleteTodo':
      return state.filter(({ id }) => id !== payload);

    case 'todos/editTodo':
      return state.map(todo => {
        const { id, todo: updatedTodo } = payload;
        return todo.id === id ? { ...todo, ...updatedTodo } : todo;
      });

    default:
      return state;
  }
};
