import axios from "axios";

const state = {
  todos: [],
};

const getters = {
  // This gets all the todos from the state and assigns them to the getter for accessibility
  allTodos: (state) => state.todos,
};

const actions = {
  // This fetches todos from the api
  async fetchTodos({ commit }) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    // This sends a mutation with the payload of the data gotten from the api
    commit("setTodos", response.data);
  },

  async addTodo({ commit }, title) {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      { title, completed: false }
    );
    commit("newTodo", response.data);
  },

  async deleteTodo({ commit }, id) {
    // This deletes a todo based on its id
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    commit("removeTodo", id);
  },

  async filterTodos({ commit }, e) {
    // get selected number
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );
    commit("setTodos", response.data);
  },
};

const mutations = {
  // this sets the todo state
  setTodos: (state, todos) => (state.todos = todos),
  // This adds a new todo
  newTodo: (state, todo) => state.todos.unshift(todo),
  // This deletes todos
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
