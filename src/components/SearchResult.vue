<template>
  <div class="search-result">
    <div class="search-result-top">
      <div class="search-result-text">
        <h4>{{data.name}}</h4>
        <h5>{{data.vicinity}}</h5>
      </div>
      <div class="buttons">
        <button
          class="add-favorite"
          @click="addFavorite"
        >
          Add Favorite
        </button>
        <button
          class="dismiss"
          @click="dismiss"
        >
          Dismisss
        </button>
      </div>
    </div>
    <img
      v-show="shouldShowPhoto"
      class="search-result-pic"
      :src="imgUrl"
    />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'SearchResult',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    idx: {
      type: Number,
      required: true,
    }
  },
  computed: {
    imgUrl() {
      return this.shouldShowPhoto && `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${this.data.photos[0].photo_reference}&sensor=false&key=${this.apiKey}`;
    },
    shouldShowPhoto() {
      return this.data && this.data.photos && this.data.photos
    },
    ...mapState(['apiKey'])
  },
  methods: {
    ...mapActions(['fetchFavoriteDetails', 'dismissSearchResult']),
    addFavorite() {
      console.log(`adding ${this.data.name} to favorites...`);
      this.fetchFavoriteDetails(this.data);
      this.dismissSearchResult(this.idx);
    },
    dismiss() {
      console.log(`dismissing ${this.data.name} from search results...`);
      this.dismissSearchResult(this.idx);
    }
  }
}
</script>
<style lang="scss" scoped>
.search-result {
  border: 1px solid gray;
  margin: 1rem;
  .search-result-top {
    display: flex;
    flex-direction: row;
    .search-result-text {
      width: 50%;
      padding: 0.5rem 0.3rem;
    }
    .buttons {
      width: 40%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      button {
        padding: 0.5rem;
        background-color: #EFEFEF;
        cursor: pointer;
        border-radius: 6%;
        font-size:1.2rem;
      }
      .add-favorite:hover {
        background-color: #DEEFDE;
        cursor: pointer;
      }
      .add-favorite:active {
        background-color: #CDEFCD;
      }
      .dismiss:hover {
        background-color: #EFDEDE;
        cursor: pointer;
      }
      .dismiss:active {
        background-color: #EFCDCD;
      }
    }
  }
  .search-result-pic {
    width: 80%;
    max-height: 200px;
  }
}
</style>
