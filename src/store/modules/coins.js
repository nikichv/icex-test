import { getCoinsList, getCoinHistory, getCoinByName } from '@/api/endpoints/coins';

const initialState = {
  list: [],
  histories: {},
  details: {},
};

const SET_COINS_LIST = 'COINS/SET_COINS_LIST';
const SET_COIN_DETAILS = 'COINS/SET_COIN_DETAILS';
const SET_COIN_HISTORY = 'COINS/SET_COIN_HISTORY';

const getters = {
};

const actions = {
  fetchCoinsList({ commit }, list) {
    return getCoinsList(list)
      .then((response) => {
        if (response.data.result && response.data.data.length > 0) {
          commit(SET_COINS_LIST, response.data.data);
        }
        return response;
      });
  },
  fetchCoinHistory({ commit }, { name, options }) {
    return getCoinHistory(name, options)
      .then((response) => {
        if (response.data.result) {
          commit(SET_COIN_HISTORY, {
            name,
            data: response.data.data,
          });
        }
        return response;
      });
  },
  fetchCoinByName({ commit }, name) {
    return getCoinByName(name)
      .then((response) => {
        if (response.data.result) {
          commit(SET_COIN_DETAILS, {
            name,
            data: response.data.data,
          });
        }
        return response;
      });
  },
};

const mutations = {
  [SET_COINS_LIST](state, arr) {
    state.list = [...arr];
  },
  [SET_COIN_HISTORY](state, { data, name }) {
    state.histories = Object.assign({}, state.histories, {
      [name]: data,
    });
  },
  [SET_COIN_DETAILS](state, { data, name }) {
    state.details = Object.assign({}, state.details, {
      [name]: data,
    });
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
