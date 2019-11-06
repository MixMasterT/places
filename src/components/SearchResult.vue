<template>
  <div class="search-result">
    <h4>{{data.name}} - {{data.vicinity}}</h4>
    <img :src="imgUrl" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'SearchResult',
  props: {
    data: {
      type: Object,
      default: () => {},
    }
  },
  computed: {
    imgUrl() {
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${this.data.photos[0].photo_reference}&sensor=false&key=${this.apiKey}`;
    },
    ...mapState(['apiKey'])
  }
}
</script>
