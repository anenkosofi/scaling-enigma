const todosInitialState = [];

export const todosReducer = (state = todosInitialState, action) => {
  switch (action.type) {
    case 'todos/addTodo':
      return [...state, action.payload];

    default:
      return state;
  }
};
