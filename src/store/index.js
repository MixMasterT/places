import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiKey: process.env.VUE_APP_MAPS_API_KEY,
    urlRoot: 'http://localhost:8080',
    currentLocation: null,
    searchResults: [],
    nearbySearchResults: [],
    favoritePlaces: [],
  },
  mutations: {
    replaceSearchResults(state, newResults) {
      state.searchResults = newResults;
    },
    replaceNearbySearchResults(state, newResults) {
      state.nearbySearchResults = newResults;
    },
    setLocation(state, loc) {
      state.currentLocation = loc;
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
    async fetchSearchResults({ commit, state }, term) {
      const paramsObj = {
        input: term,
        inputtype: 'textquery',
        fields: 'photos,formatted_address,name,rating,opening_hours,geometry',
        key: state.apiKey,
      };
      const params = Object.keys(paramsObj)
        .map(k => `${k}=${paramsObj[k]}`)
        .join('&');
      let res;
      try {
        const url = `${state.urlRoot}/findplacefromtext/json?${params}`;
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
        commit('replaceSearchResults', data.candidates);
      } catch(error) {
        console.log('error parsing json: ', error);
      }
    },
    clearSearchResults({ commit }) {
      commit('replaceSearchResults', []);
    },
    async fetchNearbySearchResults({ commit, state }, keyword, type) {
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
        commit('replaceNearbySearchResults', data.results);
      } catch(error) {
        console.log('error parsing json: ', error);
      }
    },
    clearNearbySearchResults({ commit }) {
      commit('replaceNearbySearchResults', []);
    }
  },
  modules: {
  }
})
