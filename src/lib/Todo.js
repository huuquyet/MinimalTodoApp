// Helper function for generating unique IDs
function guidGenerator() {
  function S4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
}

export default class Todo {
  constructor(descriptionText, isDone, id) {
    this.descriptionText = descriptionText || '';
    this.isDone = isDone || false;
    this.id = id || guidGenerator();
  }

  // simple serialize, and deserialize methods for localStorage
  serialize() {
    return {
      id: this.id,
      descriptionText: this.descriptionText,
      isDone: this.isDone,
    };
  }
  static deserialize(json: Object) {
    const todo = new Todo();
    todo.id = json.id || guidGenerator();
    todo.descriptionText = json.descriptionText || '';
    todo.isDone = json.isDone || false;
    return todo;
  }
}
