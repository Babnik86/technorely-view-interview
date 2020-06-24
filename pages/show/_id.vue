<template>
  <section class="container">
    <v-row>
      <v-col cols="12">
        <v-card
          class="mx-auto pt-4">
          <v-row>
            <v-col cols="12" md="4">
              <v-img
                v-if="showDetail.image && showDetail.image.medium && showDetail.image.original"
                max-height="600px"
                contain
                :lazy-src="showDetail.image.medium"
                :src="showDetail.image.original" />
              <v-img
                v-else
                class="white--text align-end"
                max-height="300px"
                contain
                src="/no-picture.jpg" />
            </v-col>
            <v-col cols="12" md="8">
              <v-card-title>{{ showDetail.name }}</v-card-title>
              <v-card-subtitle class="pb-0">
                <div v-if="showDetail.genres.length">
                  <strong>Genres:</strong>
                  <v-chip
                    v-for="(genre, gKey) in showDetail.genres"
                    :key="gKey"
                    class="ma-1"
                    small>
                    {{ genre }}
                  </v-chip>
                </div>
                <div v-if="showDetail.language">
                  <strong>Language:</strong> {{ showDetail.language }}
                </div>
                <div v-if="showDetail.status">
                  <strong>Status:</strong> {{ showDetail.status }}
                </div>
              </v-card-subtitle>
              <v-card-text class="mt-4" v-html="showDetail.summary" />
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-rating
                  v-model="showDetail.prettyRating"
                  background-color="white"
                  color="yellow accent-4"
                  half-increments
                  readonly
                  small />
              </v-card-actions>
            </v-col>
          </v-row>
          <v-card-text class="mt-4">
            <p><strong>Seasons:</strong></p>
            <v-simple-table
              :fixed-header="true"
              height="300px">
              <template v-slot:default>
                <thead>
                <tr>
                  <th class="text-left">Season</th>
                  <th class="text-left">Number</th>
                  <th class="text-left">Name</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in showSeasons" :key="item.id">
                  <td>{{ item.season }}</td>
                  <td>{{ item.number }}</td>
                  <td><a :href="item.url" target="_blank">{{ item.name }}</a></td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>

export default {
  name: 'ShowDetail',
  head () {
    return {
      title: this.title
    }
  },
  async asyncData({ params, error }) {
    let showDetail = {};
    let showSeasons = [];
    try {
      showDetail = await fetch(`http://api.tvmaze.com/shows/${params.id}`).then(res => res.json()).then((s) => {
        s.prettyRating = s.rating.average ? s.rating.average/2 : 0
        return s;
      });
      showSeasons = await fetch(`http://api.tvmaze.com/shows/${params.id}/episodes`).then(res => res.json());
    } catch (e) {
      return error({ statusCode: 404 });
    }
    return { showDetail, showSeasons, title: showDetail.name };
  },
  data: () => ({
    showDetail: {},
    showSeasons: [],
  }),
}
</script>

<style>

</style>

