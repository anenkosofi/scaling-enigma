const todosInitialState = [];

export const todosReducer = (state = todosInitialState, action) => {
  switch (action.type) {
    case 'todos/addTodo':
      return [action.payload, ...state];

    default:
      return state;
  }
};
