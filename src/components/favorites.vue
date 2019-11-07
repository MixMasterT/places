<template>
  <section class="favorite-places">
    <h2>Favorite Places</h2>
    <ul class="favorite-places">
      <li
        class="favorite-place"
        v-for="place in favoritePlaces"
      >
        <a :href="place.website" target="_blank">
          {{place.name}} - {{place.formatted_address}}
        </a>
      </li>
    </ul>
  </section>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'Favorites',
  computed: {
    ...mapState(['favoritePlaces'])
  }
}
</script>
<style lang="scss" scoped>
.favorite-places {
  list-style-type: none;
}
</style>
