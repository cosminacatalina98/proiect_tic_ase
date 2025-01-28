import { createStore } from 'vuex';

export const store = createStore({
  state: {
    counter: 0,
  },
  
  getters: {
    tripleCounter: (state) => {
      return state.counter * 3;
    },
  },
  
  mutations: {
    increment: (state, num) => {
      state.counter += num;
    },
  },
 
  actions: {
  
    asyncIncrement: ({ commit }, payload) => {
      setTimeout(() => {
        commit('increment', payload.by);
      }, payload.duration);
    },
  },
});



