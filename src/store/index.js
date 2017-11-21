import Vue from 'vue';
import Vuex from 'vuex';

import coins from './modules/coins';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    coins,
  },
});
