import {themeModes} from '../common/constants';
import Todo from './Todo';

export default class MinimalApp {
  constructor(todos, scheme, hideCompleted) {
    this.todos = todos || [];
    this.scheme = scheme || themeModes.DARK;
    this.hideCompleted = hideCompleted || false;
  }

  serialize() {
    return {
      todos: Array.from(this.todos).map(todo =>
        Object.assign(new Todo(), todo).serialize(),
      ),
      scheme: this.scheme,
      hideCompleted: this.hideCompleted,
    };
  }

  static deserialize(json: Object) {
    return {
      todos: Array.from(json.todos).map(todo => Todo.deserialize(todo)) || [],
      scheme: json.scheme || themeModes.DARK,
      hideCompleted: json.hideCompleted || false,
    };
  }
}
