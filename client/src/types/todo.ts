export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  time: {
    start: string;
    end: string;
  };
}
