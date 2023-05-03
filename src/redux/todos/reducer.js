const todosInitialState = {
  items: [],
};

export const todosReducer = (state = todosInitialState, { type, payload }) => {
  switch (type) {
    case 'todos/addTodo':
      return { ...state, items: [payload, ...state.items] };

    case 'todos/toggleCompleted':
      return {
        ...state,
        items: state.items.map(todo =>
          todo.id === payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };

    case 'todos/deleteTodo':
      return {
        ...state,
        items: state.items.filter(({ id }) => id !== payload),
      };

    case 'todos/editTodo':
      return {
        ...state,
        items: state.items.map(todo => {
          const { id, todo: updatedTodo } = payload;
          return todo.id === id ? { ...todo, ...updatedTodo } : todo;
        }),
      };

    case 'todos/clearCompleted':
      return { ...state, items: state.items.filter(todo => !todo.completed) };

    default:
      return state;
  }
};
