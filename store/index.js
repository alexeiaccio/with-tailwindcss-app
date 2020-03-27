import { types, getSnapshot } from 'mobx-state-tree';

const Todo = types
  .model({
    name: types.optional(types.string, ""),
    done: types.optional(types.boolean, false),
    user: types.maybe(types.reference(types.late(() => User)))
  })
  .actions(self => {
    function setName(newName) {
      self.name = newName;
    }
    function setUser(user) {
      if (user === "") {
        // When selected value is empty, set as undefined
        self.user = undefined;
      } else {
        self.user = user;
      }
    }
    function toggle() {
      self.done = !self.done;
    }

    return { setName, setUser, toggle };
  });

const User = types.model({
  id: types.identifier,
  name: types.optional(types.string, "")
});

export const RootStore = types
  .model({
    users: types.map(User),
    todos: types.map(Todo)
  })
  .views(self => ({
    get pendingCount() {
      return values(self.todos).filter(todo => !todo.done).length;
    },
    get completedCount() {
      return values(self.todos).filter(todo => todo.done).length;
    },
    getTodosWhereDoneIs(done) {
      return values(self.todos).filter(todo => todo.done === done);
    }
  }))
  .actions(self => {
    function addTodo(id, name) {
      self.todos.set(id, Todo.create({ name }));
    }

    return { addTodo };
  });

export const store = RootStore.create({
  users: {
    "1": {
      id: "1",
      name: "mweststrate"
    },
    "2": {
      id: "2",
      name: "mattiamanzati"
    },
    "3": {
      id: "3",
      name: "johndoe"
    }
  },
  todos: {
    "1": {
      name: "Eat a cake",
      done: true
    }
  }
});
