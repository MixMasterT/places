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
      let location;
      navigator.geolocation.getCurrentPosition(function(position) {
        const { latitude, longitude } = position.coords;
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
        res = await fetch(url, {
          method: 'GET',
          mode: 'cors',
        });
      } catch(e) {
        console.log('Error fetching favoirte details: ', e);
      }
      try {
        const data = await res.json();
        commit('addFavoritePlace', data.result);
      } catch(error) {
        console.log('error parsing json from details fetch: ', error);
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
        res = await fetch(url, {
          method: 'GET',
          mode: 'cors',
        });
      } catch(e) {
        console.log('Error fetching searchResults: ', e);
      }
      try {
        const data = await res.json();
        commit('replaceSearchResults', data.results);
      } catch(error) {
        console.log('Error parsing json from searchResults: ', error);
      }
    },
    clearSearchResults({ commit }) {
      commit('replaceSearchResults', []);
    },
    dismissSearchResult({commit}, idxToRemove) {
      commit('removeSearchResult', idxToRemove);
    }
  },
});
