import { createStore } from 'vuex';

export const store = createStore({
  state: {
    counter: 0,
  },
  // showing things, not mutating state
  getters: {
    tripleCounter: (state) => {
      return state.counter * 3;
    },
  },
  // mutating the state
  // mutations are always synchronous
  mutations: {
    increment: (state, num) => {
      state.counter += num;
    },
  },
  // commits the mutation, it's asynchronous
  actions: {
    // showing passed with payload (an object)
    asyncIncrement: ({ commit }, payload) => {
      setTimeout(() => {
        commit('increment', payload.by);
      }, payload.duration);
    },
  },
});



