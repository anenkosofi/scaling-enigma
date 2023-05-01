const todosInitialState = [];

export const todosReducer = (state = todosInitialState, action) => {
  switch (action.type) {
    case 'todos/addTodo':
      return [action.payload, ...state];

    case 'todos/toggleCompleted':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case 'todos/deleteTodo':
      return state.filter(({ id }) => id !== action.payload);

    case 'todos/editTodo':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, ...action.payload.todo }
          : todo
      );

    default:
      return state;
  }
};
