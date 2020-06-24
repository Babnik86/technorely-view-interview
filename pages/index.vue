<template>
  <section class="container">
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model.trim="q"
          label="Search Shows"
          single-line
          solo
          clearable
          append-outer-icon="mdi-magnify"
          @keyup.enter.native="fetchShows"
          @click:append-outer="fetchShows"
        ></v-text-field>
      </v-col>
      <v-col class="text-center">
        <v-select
          mandatory
          v-model="sortField"
          :append-outer-icon="orderASC ? 'mdi-arrow-down' : 'mdi-arrow-up'"
          :items="sortItems"
          label="Sort by:"
          @click:append-outer="orderASC=!orderASC"/>
      </v-col>
      <v-col cols="2" class="text-right">
        <v-btn-toggle
          v-model="showType"
          shaped
          mandatory>
          <v-btn value="grid">
            <v-icon>mdi-view-grid</v-icon>
          </v-btn>
          <v-btn value="table">
            <v-icon>mdi-view-list</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <list-shows v-if="!loading" :show-type="showType" :shows="sortedShows" />
    <v-row v-else>
      <v-col cols="12" md="4" lg="3" v-for="key in 10" :key="key">
        <v-skeleton-loader
          class="mx-auto"
          type="card, list-item@4"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import ListShows from '~/components/ListShows.vue';
import prettyShows from '~/helpers/pretty-shows';
import sortBy from '~/helpers/sortby';

export default {
  name: "HomePage",
  head () {
    return {
      title: 'Home Page'
    }
  },
  components: { ListShows },
  async asyncData() {
    let shows = [];
    try {
      shows = await fetch(`http://api.tvmaze.com/search/shows?q=girls`).then(res => res.json()).then(prettyShows);
    } catch (error) {
      console.error('Error:', error);
    }
    return { shows };
  },
  data: () => ({
    shows: [],
    sortItems: [
      {text:'Rating', value:'prettyRating'}, {text:'Name', value:'name'}
    ],
    showType: 'grid',
    page: 1,
    sortField: 'prettyRating',
    q: 'girls',
    loading: false,
    orderASC: false,
  }),
  computed: {
    sortedShows() {
      if(this.orderASC) return [...this.shows].sort(sortBy(this.sortField)).reverse();
      else return [...this.shows].sort(sortBy(this.sortField));
    },
  },
  methods: {
    async fetchShows() {
      if (!this.q) return;
      this.q = this.q.trim();
      if (!this.q.length) return;
      this.shows = [];
      this.loading = true;
      try {
        this.shows = await fetch(`http://api.tvmaze.com/search/shows?q=${this.q}`).then(res => res.json()).then(prettyShows);
      } catch (error) {
        console.error('Error:', error);
      }
      this.loading = false;
    }
  },
}
</script>

<style>

</style>

