export interface Todo {
  _id: string;
  text: string;
  completed: boolean;
  time: {
    start: string;
    end: string;
  };
}
