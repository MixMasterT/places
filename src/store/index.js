import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiKey: process.env.VUE_APP_MAPS_API_KEY,
    urlRoot: 'http://localhost:8080',
    currentLocation: null,
    searchResults: [],
    favoritePlaces: [],
  },
  mutations: {
    replaceSearchResults(state, newResults) {
      state.searchResults = newResults;
    },
    setLocation(state, loc) {
      state.currentLocation = loc;
    },
    addFavoritePlace(state, place) {
      state.favoritePlaces = [...state.favoritePlaces, place];
    },
    removeSearchResult(state, idxToRemove) {
      state.searchResults = [
        ...state.searchResults.slice(0, idxToRemove),
        ...state.searchResults.slice(idxToRemove + 1)
      ]
    }
  },
  actions: {
    getCurrentLocation({ commit }) {
      console.log('location getting got...');
      let location;
      navigator.geolocation.getCurrentPosition(function(position) {
        const { latitude, longitude } = position.coords;
        console.log(`lat: ${latitude}, long: ${longitude}`);
        commit('setLocation', { latitude, longitude });
      });
    },
    async fetchFavoriteDetails({ commit, state }, place) {
      const paramsObj = {
        place_id: place.place_id,
        inputtype: 'textquery',
        fields: 'photo,formatted_address,name,rating,opening_hours,website',
        key: state.apiKey,
      };
      const params = Object.keys(paramsObj)
        .map(k => `${k}=${paramsObj[k]}`)
        .join('&');
      let res;
      try {
        const url = `${state.urlRoot}/details/json?${params}`;
        console.log('details request url: ', url);
        res = await fetch(url, {
          method: 'GET',
          mode: 'cors',
        });
      } catch(e) {
        console.log('Error: ', e);
      }
      try {
        console.log('details res: ', res);
        const data = await res.json();
        console.log('data: ', data);
        commit('addFavoritePlace', data.result);
      } catch(error) {
        console.log('error parsing json: ', error);
      }
    },
    async fetchSearchResults({ commit, state }, keyword, type) {
      const { latitude, longitude } = state.currentLocation;
      const paramsObj = {
        keyword,
        radius: 5000,
        location:`${latitude},${longitude}`,
        key: state.apiKey,
      };
      const params = Object.keys(paramsObj)
        .map(k => `${k}=${paramsObj[k]}`)
        .join('&');
      let res;
      try {
        const url = `${state.urlRoot}/nearbysearch/json?${params}`;
        console.log('request url: ', url);
        res = await fetch(url, {
          method: 'GET',
          mode: 'cors',
        });
      } catch(e) {
        console.log('Error: ', e);
      }
      try {
        console.log('res: ', res);
        const data = await res.json();
        console.log('data: ', data);
        commit('replaceSearchResults', data.results);
      } catch(error) {
        console.log('error parsing json: ', error);
      }
    },
    clearSearchResults({ commit }) {
      commit('replaceSearchResults', []);
    },
    dismissSearchResult({commit}, idxToRemove) {
      commit('removeSearchResult', idxToRemove);
    }
  },
  modules: {
  }
})
