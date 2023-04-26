const todosInitialState = [];

export const todosReducer = (state = todosInitialState, action) => {
  switch (action.type) {
    case 'todos/addTodo':
      return [...state, action.payload];

    case 'todos/deleteTodo':
      return state.filter(({ id }) => id !== action.payload);

    case 'todos/toggleCompleted':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    default:
      return state;
  }
};
