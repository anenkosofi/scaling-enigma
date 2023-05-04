interface Time {
  start: string;
  end: string;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  time: Time;
}
