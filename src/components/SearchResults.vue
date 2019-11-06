<template>
  <div class="search-results">
    <SearchResult
      v-for="(res, idx) in nearbySearchResults"
      :data="res"
      :key="idx"
    />
  </div>
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
    ...mapState(['nearbySearchResults'])
  },
}
</script>
