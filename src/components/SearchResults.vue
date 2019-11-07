<template>
  <section class="search-result-container">
    <h2>Search Results</h2>
    <div class="search-results">
      <SearchResult
        v-for="(res, idx) in searchResults"
        :data="res"
        :idx="idx"
        :key="idx"
      />
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex';
import SearchResult from './SearchResult';

export default {
  name: 'SearchResults',
  components: {
    SearchResult,
  },
  computed: {
    ...mapState(['searchResults'])
  },
}
</script>
<style scoped>
  .search-results {
    border: 1px solid gray;
    max-height: 50vh;
    overflow-y: auto;
    padding: 1rem;
    width: 94%;
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-template-rows: auto;
  }
</style>
