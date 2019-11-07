<template>
  <div class="places">
    <h1>{{ msg }}</h1>
    <div class="search-box">
      <input
        class="search-term"
        type="text"
        v-model="searchTerm"
        placeholder="search for nearby places..."
      />
      <button
        v-show="currentLocation"
        class="search-icon"
        @click="runSearch"
      />
      <button
        v-show="searchResults.length"
        class="clear-search"
        @click="handleClearClick"
      >
        Clear Search Results
      </button>
    </div>
    <SearchResults v-show="searchResults.length"/>
    <Favorites v-show="favoritePlaces.length"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import SearchResults from './SearchResults';
import Favorites from './favorites';

export default {
  name: 'Places',
  props: {
    msg: String
  },
  components: {
    SearchResults,
    Favorites,
  },
  data() {
    return {
      searchTerm: '',
    }
  },
  computed: {
    ...mapState([
      'currentLocation',
      'searchResults',
      'favoritePlaces'
    ]),
  },
  methods: {
    handleClearClick() {
      this.searchTerm = '';
      this.clearSearchResults();
    },
    runSearch() {
      console.log('search running: ', this.searchTerm);
      this.fetchSearchResults(this.searchTerm);
      this.searchTerm = '';
    },
    ...mapActions([
      'fetchSearchResults',
      'clearSearchResults',
    ])
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.search-box {
  width: 100%;
  input {
    width: 50%;
    min-width: 25rem;
    height: 10%;
    min-height: 2rem;
    font-size: 1.6rem;

  }
  .search-term {
    padding: 0.3rem;
  }
  button {
    padding: 0.5rem;
    background-color: #EFEFEF;
    cursor: pointer;
    border-radius: 6%;
    font-size: 1.4rem;
  }
  .clear-search:hover {
    background-color: #EFDEDE;
  }
  .clear-search:active {
    background-color: #EFCDCD;
  }
  .search-icon:hover {
    background-color: #DEEFDE;
  }
  .search-icon:active {
    background-color: #CDEFCD;
  }
  .search-icon::after {
    font-size: 1.4rem;
    content: "\1F50D";
  }
}
</style>
